import PageBreadcrumb from "../components/common/PageBreadCrumb";
import UserMetaCard from "../components/UserProfile/UserMetaCard";
import UserInfoCard from "../components/UserProfile/UserInfoCard";
import UserAddressCard from "../components/UserProfile/UserAddressCard";
import PageMeta from "../components/common/PageMeta";
import { useMeQuery } from "@data/user";
import Loader from "@components/ui/loader/loader";
import ErrorMessage from "@components/ui/error-message";
import UserPasswordCard from "@components/UserProfile/UserPasswordCard";

export default function UserProfiles() {
  const { user, loading, error } = useMeQuery();

  if (loading) return <Loader text="Loading..." />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <PageMeta
        title="React.js Profile Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Profile Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Profile" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Profile
        </h3>
        {user && (
          <div className="space-y-6">
            <UserMetaCard user={user} />
            <UserInfoCard initialValues={user} />
            <UserAddressCard user={user} />
            <UserPasswordCard user={user} />
          </div>
        )}
      </div>
    </>
  );
}
