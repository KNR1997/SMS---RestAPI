import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";

// Assume these icons are imported from an icon library
import {
  CalenderIcon,
  ChevronDownIcon,
  GridIcon,
  HorizontaLDots,
  FileIcon,
  DollarLineIcon,
  UserCircleIcon,
  UserIcon,
  PaperPlaneIcon,
  GroupIcon,
  BoxIconLine,
  Building,
  Exam,
  Report,
} from "../icons";
import { useSidebar } from "../context/SidebarContext";
import { useAuth } from "../context/AuthContext";
import { ERole } from "../types";

type SubNavItem = {
  name: string;
  path: string;
  pro?: boolean;
  new?: boolean;
  roles?: string[]; // Optional role-based control
};

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: SubNavItem[];
  roles: string[];
};

const navItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Dashboard",
    path: "/",
    // subItems: [{ name: "Ecommerce", path: "/", pro: false }],
    roles: [ERole.ROLE_ADMIN, ERole.ROLE_STUDENT],
  },
  {
    name: "Subjects",
    icon: <FileIcon />,
    subItems: [
      { name: "All Subjects", path: "/subjects", pro: false },
      { name: "Create subject", path: "/subjects/create", pro: false },
    ],
    roles: [ERole.ROLE_ADMIN],
  },
  {
    name: "Courses",
    icon: <BoxIconLine />,
    subItems: [
      { name: "All Courses", path: "/courses", pro: false },
      { name: "Create course", path: "/courses/create", pro: false },
    ],
    roles: [ERole.ROLE_ADMIN],
  },
  {
    name: "My Courses",
    icon: <BoxIconLine />,
    path: "/courses",
    roles: [ERole.ROLE_TEACHER],
  },
  {
    name: "My Students",
    icon: <BoxIconLine />,
    path: "/students",
    roles: [ERole.ROLE_TEACHER],
  },
  {
    name: "Users",
    icon: <UserIcon />,
    subItems: [
      { name: "All Users", path: "/users", pro: false },
      { name: "Create user", path: "/users/create", pro: false },
    ],
    roles: [ERole.ROLE_ADMIN],
  },
  {
    name: "Students",
    icon: <GroupIcon />,
    subItems: [
      { name: "All Students", path: "/students", pro: false },
      { name: "Create student", path: "/students/create", pro: false },
    ],
    roles: [ERole.ROLE_ADMIN, ERole.ROLE_RECEPTIONIST],
  },
  {
    name: "Guardians",
    icon: <UserCircleIcon />,
    subItems: [{ name: "All Guardians", path: "/guardians", pro: false }],
    roles: [ERole.ROLE_ADMIN, ERole.ROLE_RECEPTIONIST],
  },
  {
    name: "Enrollments",
    icon: <PaperPlaneIcon />,
    subItems: [
      {
        name: "All Enrollments",
        path: "/enrollments",
        pro: false,
      },
      {
        name: "Create enrollment",
        path: "/enrollments/create",
        pro: false,
        roles: [ERole.ROLE_ADMIN, ERole.ROLE_RECEPTIONIST], // Only ADMIN can see
      },
    ],
    roles: [ERole.ROLE_ADMIN, ERole.ROLE_TEACHER, ERole.ROLE_RECEPTIONIST],
  },
  {
    name: "Courses",
    icon: <FileIcon />,
    subItems: [
      {
        name: "My Courses",
        path: "/student/courses",
        pro: false,
      },
    ],
    roles: [ERole.ROLE_STUDENT],
  },
  {
    name: "Enrollments",
    icon: <PaperPlaneIcon />,
    subItems: [
      {
        name: "My Enrollments",
        path: "/student/enrollments",
        pro: false,
      },
    ],
    roles: [ERole.ROLE_STUDENT],
  },
  {
    name: "Exam Results",
    icon: <Exam className="" />,
    subItems: [
      {
        name: "My Exam Results",
        path: "/examResults",
        pro: false,
      },
    ],
    roles: [ERole.ROLE_STUDENT],
  },
  {
    name: "Employee Payments",
    icon: <DollarLineIcon />,
    subItems: [
      { name: "All Payments", path: "/employee/payments", pro: false },
      { name: "Create payment", path: "/employee/payments/create", pro: false },
    ],
    roles: [ERole.ROLE_ADMIN],
  },
  {
    name: "Student Payments",
    icon: <DollarLineIcon />,
    subItems: [
      { name: "All Payments", path: "/payments", pro: false },
      { name: "Create payment", path: "/payments/create", pro: false },
    ],
    roles: [ERole.ROLE_ADMIN, ERole.ROLE_RECEPTIONIST],
  },
  {
    name: "Halls",
    icon: <Building className="fill-gray-800 size-6 dark:fill-white/90" />,
    subItems: [
      { name: "All Halls", path: "/halls", pro: false },
      { name: "Create hall", path: "/halls/create", pro: false },
    ],
    roles: [ERole.ROLE_ADMIN],
  },
  {
    name: "Exams",
    icon: <Exam className="fill-gray-800 size-6 dark:fill-white/90" />,
    subItems: [
      { name: "All Exams", path: "/exams", pro: false },
      {
        name: "Create exam",
        path: "/exams/create",
        pro: false,
        roles: [ERole.ROLE_ADMIN, ERole.ROLE_RECEPTIONIST],
      },
    ],
    roles: [ERole.ROLE_ADMIN, ERole.ROLE_TEACHER],
  },
  {
    name: "Events",
    icon: <CalenderIcon />,
    subItems: [
      { name: "Calendar", path: "/events-calendar", pro: false },
      {
        name: "All Events",
        path: "/events",
        pro: false,
        roles: [ERole.ROLE_ADMIN, ERole.ROLE_RECEPTIONIST, ERole.ROLE_TEACHER],
      },
      {
        name: "Create event",
        path: "/events/create",
        pro: false,
        roles: [ERole.ROLE_ADMIN, ERole.ROLE_RECEPTIONIST],
      },
    ],
    roles: [ERole.ROLE_ADMIN, ERole.ROLE_RECEPTIONIST, ERole.ROLE_TEACHER],
  },
  {
    name: "Events",
    icon: <CalenderIcon />,
    path: "/student/calendar",
    // subItems: [
    //   { name: "Events", path: "/events-calendar", pro: false },
    // ],
    roles: [ERole.ROLE_STUDENT],
  },
  {
    name: "Reports",
    icon: <Report className="fill-gray-800 size-6 dark:fill-white/90" />,
    subItems: [
      { name: "Teacher Report", path: "/reports/teacher-report", pro: false },
      { name: "Student Report", path: "/reports/student-report", pro: false },
      { name: "Employee Report", path: "/reports/employee-report", pro: false },
      {
        name: "Institute Income Report",
        path: "/reports/institute-income-report",
        pro: false,
      },
      {
        name: "Monthly Active Student Report",
        path: "/reports/monthly-active-student-report",
        pro: false,
      },
      {
        name: "Student Registration Increment Report",
        path: "/reports/student-registration-increment-report",
        pro: false,
      },
    ],
    roles: [ERole.ROLE_ADMIN],
  },
];

const othersItems: NavItem[] = [];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();
  const { user } = useAuth();

  const filteredItems = navItems
    .filter((item) => item.roles.includes(user?.erole))
    .map((item) => ({
      ...item,
      subItems: item.subItems?.filter(
        (sub) =>
          !sub.roles || // If subItem has no roles, show it by default
          sub.roles.includes(user?.erole)
      ),
    }))
    .filter((item) => item.subItems?.length || item.path); // hide items with no visible subItems or path

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // const isActive = (path: string) => location.pathname === path;
  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );

  useEffect(() => {
    let submenuMatched = false;
    ["main", "others"].forEach((menuType) => {
      const items = menuType === "main" ? filteredItems : othersItems;
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: menuType as "main" | "others",
                index,
              });
              submenuMatched = true;
            }
          });
        }
      });
    });

    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [location, isActive]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  const renderMenuItems = (items: NavItem[], menuType: "main" | "others") => (
    <ul className="flex flex-col gap-4">
      {items.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "menu-item-active"
                  : "menu-item-inactive"
              } cursor-pointer ${
                !isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
              }`}
            >
              <span
                className={`menu-item-icon-size  ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="menu-item-text">{nav.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDownIcon
                  className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "rotate-180 text-brand-500"
                      : ""
                  }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                to={nav.path}
                className={`menu-item group ${
                  isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                }`}
              >
                <span
                  className={`menu-item-icon-size ${
                    isActive(nav.path)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text">{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      to={subItem.path}
                      className={`menu-dropdown-item ${
                        isActive(subItem.path)
                          ? "menu-dropdown-item-active"
                          : "menu-dropdown-item-inactive"
                      }`}
                    >
                      {subItem.name}
                      {/* <span className="flex items-center gap-1 ml-auto">
                        {subItem.new && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge`}
                          >
                            new
                          </span>
                        )}
                        {subItem.pro && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge`}
                          >
                            pro
                          </span>
                        )}
                      </span> */}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-center"
        }`}
      >
        <Link to="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <img
                className="dark:hidden"
                src="/images/logo/yma-logo.svg"
                alt="Logo"
                width={150}
                height={40}
              />
              <img
                className="hidden dark:block"
                src="/images/logo/yma-logo-dark-mode.svg"
                alt="Logo"
                width={150}
                height={40}
              />
            </>
          ) : (
            <img
              src="/images/logo/logo-icon.svg"
              alt="Logo"
              width={32}
              height={32}
            />
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Menu"
                ) : (
                  <HorizontaLDots className="size-6" />
                )}
              </h2>
              {renderMenuItems(filteredItems, "main")}
            </div>
            {/* <div className="">
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Others"
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {renderMenuItems(othersItems, "others")}
            </div> */}
          </div>
        </nav>
        {/* {isExpanded || isHovered || isMobileOpen ? <SidebarWidget /> : null} */}
      </div>
    </aside>
  );
};

export default AppSidebar;
