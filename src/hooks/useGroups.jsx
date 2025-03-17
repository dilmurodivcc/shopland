import API from "../API";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { message, Modal } from "antd";
import { toast } from "sonner";

const searchGroup = async (searchText) => {
  if (!searchText || searchText.length < 2) return [];

  try {
    console.log("Searching groups with query:", searchText);
    const { data } = await API.get(`/groups/search?q=${searchText}`);
    console.log("Search groups response:", data);

    const normalizedData = data.map((group) => ({
      ...group,
      _id: group._id || group.id,
      id: group.id || group._id,
    }));

    return normalizedData;
  } catch (error) {
    console.error("Search groups error:", error);
    toast.error("Guruhlarni qidirishda xatolik yuz berdi");
    return [];
  }
};

const searchMember = async (searchText) => {
  if (!searchText || searchText.length < 2) return [];
  const { data } = await API.get(`/users/search?q=${searchText}`);
  return data;
};

const joinGroup = async ({ groupId, password }) => {
  if (!groupId || !password)
    throw new Error("Guruh ID va parol talab qilinadi");

  console.log("API call - joinGroup:", { groupId, password: "***" });

  try {
    let endpoint = `/groups/${groupId}/join`;
    console.log("Join group endpoint:", endpoint);

    const { data } = await API.post(endpoint, { password });
    console.log("Join group success:", data);
    return data;
  } catch (error) {
    console.error("Join group error:", error.response?.data || error);
    throw error;
  }
};

const fetchMyGroups = async () => {
  try {
    console.log("Fetching my groups");
    const { data } = await API.get("/groups?include=members,items,owner");

    const normalizedData = data.map((group) => {
      const uniqueMembers = group.members
        ? Array.from(new Map(group.members.map((m) => [m._id, m])).values())
        : [];

      return {
        ...group,
        members: uniqueMembers,
        _id: group._id || group.id,
        id: group.id || group._id,
      };
    });

    console.log("My groups fetched:", normalizedData);
    return normalizedData;
  } catch (error) {
    console.error("Error fetching my groups:", error);
    toast.error("Guruhlar ma'lumotlarini olishda xatolik");
    return [];
  }
};

const createGroup = async ({ name, password }) => {
  if (!name || !password) throw new Error("Group name and password required");
  const { data } = await API.post("/groups", { name, password });
  return data;
};

const leaveGroup = async (groupId) => {
  if (!groupId) throw new Error("Group ID required");
  const { data } = await API.post(`/groups/${groupId}/leave`);
  return data;
};

const deleteGroup = async (groupId) => {
  if (!groupId) throw new Error("Group ID required");
  const { data } = await API.delete(`/groups/${groupId}`);
  return data;
};

const addMember = async ({ groupId, memberId }) => {
  if (!groupId || !memberId)
    throw new Error("Group ID and Member ID are required");

  console.log("Adding member:", { groupId, memberId });
  try {
    const { data } = await API.post(`/groups/${groupId}/members`, { memberId });
    console.log("Add member success:", data);
    return data;
  } catch (error) {
    console.error("Add member error:", error.response?.data || error);
    throw error;
  }
};

const removeMember = async ({ groupId, memberId }) => {
  if (!groupId || !memberId)
    throw new Error("Group ID and Member ID are required");
  const { data } = await API.delete(`/groups/${groupId}/members/${memberId}`);
  return data;
};
const addItemToGroup = async ({ groupId, itemData }) => {
  const { data } = await API.post(`/items`, { groupId, ...itemData });
  return data;
};

const removeItemFromGroup = async (itemId) => {
  const { data } = await API.delete(`/items/${itemId}`);
  return data;
};

const markItemAsBought = async (itemId) => {
  const { data } = await API.post(`/items/${itemId}/mark-as-bought`);
  return data;
};

const removeBoughtItem = async (itemId) => {
  const { data } = await API.delete(`/items/${itemId}/mark-as-bought`);
  return data;
};

const useGroups = (searchText) => {
  const {
    data: groups = [],
    isLoading: isLoadingGroups,
    isError: isErrorGroups,
  } = useQuery({
    queryFn: () => searchGroup(searchText),
    queryKey:
      searchText.length > 1 ? ["searchGroup", searchText] : ["searchGroup"],
    enabled: searchText.length > 1,
  });
  return { groups, isLoadingGroups, isErrorGroups };
};

const useMember = (searchText) => {
  const {
    data: members = [],
    isLoading: isLoadingMember,
    isError: isErrorMember,
  } = useQuery({
    queryFn: () => searchMember(searchText),
    queryKey:
      searchText.length > 1 ? ["searchMember", searchText] : ["searchMember"],
    enabled: searchText.length > 1,
  });
  return { members, isLoadingMember, isErrorMember };
};

const useJoinGroup = () => {
  const queryClient = useQueryClient();
  const { refetch, myGroups } = useMyGroups();

  return useMutation({
    mutationFn: joinGroup,
    onMutate: async ({ groupId, password }) => {
      const isAlreadyMember = myGroups.some(
        (g) => g._id === groupId || g.id === groupId
      );
      if (isAlreadyMember) {
        throw new Error("Siz allaqachon bu guruhga a'zosiz");
      }
    },
    onSuccess: async (data) => {
      console.log("Joining success:", data);
      toast.success("Guruhga muvaffaqiyatli qo'shildingiz!");
      await refetch(); // Refresh myGroups data after joining
      queryClient.invalidateQueries("myGroups");
    },
    onError: (error) => {
      console.error("Joining error in hook:", error);
      const errorMessage = error.response?.data?.message || error.message;

      // Error message formatting
      if (errorMessage.includes("password") || errorMessage.includes("parol")) {
        toast.error("Noto'g'ri parol kiritildi");
      } else if (
        errorMessage.includes("already") ||
        errorMessage.includes("a'zo")
      ) {
        toast.error("Siz allaqachon bu guruhga a'zosiz");
      } else {
        toast.error(`Guruhga qo'shilishda xatolik: ${errorMessage}`);
      }
    },
  });
};

const useMyGroups = () => {
  const {
    data: myGroups = [],
    isLoading: isLoadingMyGroups,
    refetch,
  } = useQuery({
    queryFn: fetchMyGroups,
    queryKey: ["myGroups"],
    staleTime: 0,
    cacheTime: 0,
  });

  return { myGroups, isLoadingMyGroups, refetch };
};

const useCreateGroup = () => {
  const { refetch } = useMyGroups();
  return useMutation({
    mutationFn: createGroup,
    onSuccess: async (data) => {
      toast.success("Guruh muvaffaqiyatli yaratildi!");
      await refetch();
    },
    onError: (error) => {
      toast.error(`Xatolik: ${error.response?.data?.message || error.message}`);
    },
  });
};

const useLeaveGroup = () => {
  return useMutation({
    mutationFn: leaveGroup,
  });
};

const useDeleteGroup = () => {
  return useMutation({
    mutationFn: deleteGroup,
  });
};

const useConfirmLeaveGroup = () => {
  const { refetch } = useMyGroups();
  const navigate = useNavigate();
  const { mutate: leaveMutate } = useLeaveGroup();

  const confirmLeaveGroup = (groupId) => {
    Modal.confirm({
      title: "Guruhni tark etishni istaysizmi?",
      content: "Siz bu guruhga boshqa kira olmaysiz.",
      okText: "Ha, tark etish",
      okType: "danger",
      cancelText: "Bekor qilish",
      onOk: () => {
        leaveMutate(groupId, {
          onSuccess: () => {
            toast.success("Guruhni muvaffaqiyatli tark etdingiz");
            refetch();
            navigate("/");
          },
          onError: (error) => {
            toast.error(`Guruhni tark etishda xatolik: ${error.message}`);
          },
        });
      },
    });
  };
  return confirmLeaveGroup;
};

const useConfirmDeleteGroup = () => {
  const { refetch } = useMyGroups();
  const navigate = useNavigate();
  const { mutate: deleteMutate } = useDeleteGroup();

  const confirmDeleteGroup = (groupId) => {
    Modal.confirm({
      title: "Guruhni o'chirishni istaysizmi?",
      content: "Bu amalni ortga qaytarib bo'lmaydi.",
      okText: "Ha, o'chirish",
      okType: "danger",
      cancelText: "Bekor qilish",
      onOk: () => {
        deleteMutate(groupId, {
          onSuccess: () => {
            toast.success("Guruh muvaffaqiyatli o'chirildi");
            refetch();
            navigate("/");
          },
          onError: (error) => {
            toast.error(`Guruhni o'chirishda xatolik: ${error.message}`);
          },
        });
      },
    });
  };
  return confirmDeleteGroup;
};

const useAddMember = () => {
  const { refetch, myGroups } = useMyGroups();

  return useMutation({
    mutationFn: addMember,
    onMutate: async ({ groupId, memberId }) => {
      // Guruhda shu a'zo borligini tekshirish
      const targetGroup = myGroups.find((g) => g._id === groupId);
      if (targetGroup && targetGroup.members) {
        const isAlreadyMember = targetGroup.members.some(
          (m) => m._id === memberId
        );
        if (isAlreadyMember) {
          throw new Error("Bu foydalanuvchi allaqachon guruhga qo'shilgan");
        }
      }
    },
    onSuccess: async (data) => {
      toast.success("A'zo muvaffaqiyatli qo'shildi!");
      await refetch();
    },
    onError: (error) => {
      console.error("Add member mutation error:", error);
      toast.error(
        `A'zoni qo'shishda xatolik: ${
          error.response?.data?.message || error.message
        }`
      );
    },
  });
};

const useRemoveMember = () => {
  const { refetch } = useMyGroups();
  return useMutation({
    mutationFn: removeMember,
    onSuccess: async () => {
      toast.success("A'zo muvaffaqiyatli o'chirildi!");
      await refetch();
    },
    onError: (error) => {
      toast.error(
        `A'zoni o'chirishda xatolik: ${
          error.response?.data?.message || error.message
        }`
      );
    },
  });
};

const useGroupItems = () => {
  const queryClient = useQueryClient();
  const { refetch } = useMyGroups();

  return {
    addItemMutation: useMutation({
      mutationFn: addItemToGroup,
      onSuccess: async () => {
        await refetch();
        queryClient.invalidateQueries("groupItems");
      },
      onError: (error) => toast.error(`Xatolik: ${error.message}`),
    }),
    removeItemMutation: useMutation({
      mutationFn: removeItemFromGroup,
      onSuccess: async () => {
        toast.success("Mahsulot muvaffaqiyatli o'chirildi!");
        await refetch();
        queryClient.invalidateQueries("groupItems");
      },
      onError: (error) => toast.error(`Xatolik: ${error.message}`),
    }),
    removeBoughtItemMutation: useMutation({
      mutationFn: removeBoughtItem,
      onSuccess: async () => {
        toast.success("Mahsulot muvaffaqiyatli o'chirildi!");
        await refetch();
        queryClient.invalidateQueries("groupItems");
      },
      onError: (error) => toast.error(`Xatolik: ${error.message}`),
    }),
    markItemAsBoughtMutation: useMutation({
      mutationFn: markItemAsBought,
      onSuccess: async () => {
        toast.success("Mahsulot sotib olindi deb belgilandi!");
        await refetch();
        queryClient.invalidateQueries("groupItems");
      },
      onError: (error) => toast.error(`Xatolik: ${error.message}`),
    }),
  };
};

export {
  useGroups,
  useMember,
  useJoinGroup,
  useMyGroups,
  useDeleteGroup,
  useCreateGroup,
  useConfirmLeaveGroup,
  useConfirmDeleteGroup,
  useAddMember,
  useRemoveMember,
  useGroupItems,
};
