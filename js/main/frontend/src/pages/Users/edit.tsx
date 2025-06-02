import { useParams } from "react-router-dom";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import CreateOrUpdateUserForm from "../../components/user/user-form";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUserQuery } from "../../data/user";
import Loader from "../../components/ui/loader/loader";
import ErrorMessage from "../../components/ui/error-message";

export default function EditUserPage() {
  const { id } = useParams();
  // const token = localStorage.getItem("token");
  // const [user, setUser] = useState();

  const {user, loading, error} = useUserQuery(id!)

  if (loading) return <Loader text="Loading..." />;
  if (error) return <ErrorMessage message={error.message} />;

  // Fetch user data if editing
  // useEffect(() => {
  //   if (id) {
  //     axios
  //       .get(`http://localhost:8080/api/users/${id}`, {
  //         headers: { Authorization: `Bearer ${token}` },
  //       })
  //       .then((res) => {
  //         setUser(res.data);
  //       })
  //       .catch(() => {
  //         alert("Failed to load user");
  //       });
  //   }
  // }, [id]);

  console.log("user: ", user);

  return (
    <>
      <PageBreadcrumb pageTitle="Edit User" />
      {user && <CreateOrUpdateUserForm initialValues={user} />}
    </>
  );
}
