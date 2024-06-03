import { GetUsersParams, User } from "@/interfaces";
import { deleteUser, getUsers, updateUser } from "@/services";
import { HttpStatusCode } from "axios";
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import toastify from '@/lib/notifications/toastify';

interface UseSearchUsersReturn {
  users: User[];
  loading: boolean;
  handleGetUsers: () => Promise<void>;
  error: string | null;
}

export function useSearchUsers({
  offset,
  limit
}: {
  offset?: number;
  limit?: number;
}): UseSearchUsersReturn {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleGetUsers = useCallback(async () => {
    try {
      const params: GetUsersParams = { offset, limit }

      const response = await getUsers({ params });

      if (response.status === HttpStatusCode.Ok) {
        const { users } = response.data;
        setUsers(users);
        setLoading(false);
      }
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [offset, limit])

  useEffect(() => {
    handleGetUsers();
  }, [handleGetUsers])

  return { users, loading, error, handleGetUsers }
}

interface UseDeleteUserReturn {
  loading: boolean;
  error: string | null;
  handleDeleteUser: (guid: string) => void;
}

export function useDeleteUser({
  refetch
}: {
  refetch: () => Promise<void>
}): UseDeleteUserReturn {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleDeleteUser = async (guid: string) => {
    if (!refetch) return;

    try {
      setLoading(true);

      const response = await deleteUser({ params: { guid } });
      if (response.status === HttpStatusCode.Ok) {
        const { user } = response.data;

        await refetch();
        setLoading(false);
        toastify(`User ${user.email} deleted successfully!`, 'success');
      }
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return { loading, error, handleDeleteUser }
}

interface UseUpdateUserReturn {
  loading: boolean;
  error: string | null;
  handleUpdateUser: (guid: string, data: any) => void;
}

export function useUpdateUser({
  refetch,
  onClose
}: {
  refetch: () => Promise<void>
  onClose: Dispatch<SetStateAction<boolean>>
}): UseUpdateUserReturn {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpdateUser = useCallback(async (guid: string, data: {
    name: string;
    last_name: string;
    email: string;
  }) => {
    try {
      setLoading(true);

      const response = await updateUser({ params: { guid, ...data } });
      if (response.status === HttpStatusCode.Ok) {
        const { user } = response.data;

        await refetch();
        setLoading(false);
        onClose((prev) => !prev);
        toastify(`User ${user.email} updated successfully!`, 'success');
      }
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [refetch, onClose])

  return { loading, error, handleUpdateUser }
}