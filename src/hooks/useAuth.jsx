import API from "../API"
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const login = async ({ username, password }) => {
  const res = await API.post("/auth", { username, password });
  if (res.status === 200) {
    console.log(res.data);
    
    return res.data;
  }
  throw new Error("Login failed!");
}

const register = async ({ username, password, name }) => {
  const res = await API.post("/users", { username, password, name });
  if (res.status === 201) {
    return res.data;
  }
  throw new Error("Registration failed!");
}
const useAuth = () => {
  const navigate = useNavigate();
  // const { setUser } = useStore();
  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess(data) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user)); 
      console.log(data.user);
      
      navigate("/");
      toast.success("Login successful!");
    },
    onError() {
      toast.error(error.response.data.message);
    },
  });

  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess(data) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user)); 
      // setUser(data.user); 
      console.log(data.user);
      
      navigate("/");
      toast.success("Registration successful!");
    },
    onError() {
      toast.error(error.response.data.message);
    }  
  });

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  }

  return {
    loginMutation,
    registerMutation,
    logout
  };
};

export default useAuth