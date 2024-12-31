"use client";

import { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from "@nextui-org/react";
import Link from "next/link";
import { profile, ProfileResponse } from "@/api/auth.api";
import { useRouter } from "next/navigation";

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default function NavbarUI() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<ProfileResponse | null>(null);

  const router = useRouter();

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        const userData = await profile(token);
        setUser(userData);
      }
    } catch (error) {
      localStorage.removeItem("token");
      router.push("/login");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const menuItems = [
    "Movies",
    "Showtimes",
    "News",
    "Profile",
    "Log Out",
  ];

  return (
    <Navbar shouldHideOnScroll onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <AcmeLogo />
          <Link href="/" className="font-bold text-inherit">CinemaWEB</Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/movies">
            Movies
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="/showtimes" className="text-primary">
            Showtimes
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/news">
            News
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {user == null ? (
          <>
            <NavbarItem className="hidden lg:flex">
              <Link className="text-primary" href="/login">Login</Link>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="primary" className="text-white" href="#" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </>
        ) : (
          <NavbarItem className="hidden lg:flex">
            <Link href="/profile">Profile</Link>
          </NavbarItem>
        )}
      </NavbarContent>
      <NavbarMenu className="bg-black">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              href="#"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
