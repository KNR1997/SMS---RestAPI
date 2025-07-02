import { ERole } from "@types";
import { useAuth } from "../../context/AuthContext";

const AdminOnly = ({ children }: { children: any }) => {
  const { user } = useAuth();
  return user?.erole === ERole.ROLE_ADMIN ? children : null;
};

export default AdminOnly;
