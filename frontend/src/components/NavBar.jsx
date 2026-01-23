import { Link } from "react-router";
import React, { useRef, useEffect } from "react";
import {
  PlusIcon,
  Palette,
  Sun,
  Moon,
  Cake,
  Bug,
  Leaf,
  Briefcase,
  Zap,
  RotateCcw,
  CircuitBoard,
  Heart,
  Ghost,
  Trees,
  Droplet,
  Headphones,
  Wand2,
  Grid3x3,
  Square,
  Crown,
  Printer,
  Coffee,
  Snowflake,
  Sunset,
  Cloud,
  Sparkles,
  Flame,
  BookOpen,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const themeIcons = {
  light: Sun,
  dark: Moon,
  cupcake: Cake,
  bumblebee: Bug,
  emerald: Leaf,
  corporate: Briefcase,
  synthwave: Zap,
  retro: RotateCcw,
  cyberpunk: CircuitBoard,
  valentine: Heart,
  halloween: Ghost,
  garden: Leaf,
  forest: Trees,
  aqua: Droplet,
  lofi: Headphones,
  pastel: Sparkles,
  fantasy: Wand2,
  wireframe: Grid3x3,
  black: Square,
  luxury: Crown,
  dracula: Cloud,
  cmyk: Printer,
  autumn: Flame,
  business: Briefcase,
  acid: Zap,
  lemonade: Sun,
  night: Moon,
  coffee: Coffee,
  winter: Snowflake,
  dim: Moon,
  nord: Snowflake,
  sunset: Sunset,
};

const NavBar = () => {
  const { theme, setTheme, themes, mounted } = useTheme();
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        const checkbox = dropdownRef.current?.querySelector("input[type='checkbox']");
        if (checkbox) checkbox.checked = false;
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted) return null;

  return (
    <header className="bg-base-300 border-b border-base-content/50">
      <div className="mx-auto max-w-5xl p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary">
            <Link to={"/"}>ProductStore🛒</Link>
          </h1>
          <div className="flex items-center gap-4">
            <Link to={"/create"} className="btn btn-primary">
            <PlusIcon className="h-5 w-5" />
              <span>Add Product</span>
            </Link>

            <div className="dropdown relative" ref={dropdownRef}>
              <button className="btn btn-primary flex items-center gap-2">
                <span>Themes</span>
                <Palette className="size-5" />
              </button>
              <div className="dropdown-content absolute left-1/2 -translate-x-1/2 top-full z-50 w-48 max-h-96 overflow-y-auto bg-base-200 rounded-box shadow-lg mt-1">
                <ul className="menu p-2">
                  {themes.map((t) => {
                    const IconComponent = themeIcons[t] || Palette;
                    return (
                      <li key={t}>
                        <button
                          onClick={() => {
                            setTheme(t);
                            // Close dropdown
                            const checkbox = dropdownRef.current?.querySelector("input[type='checkbox']");
                            if (checkbox) checkbox.checked = false;
                          }}
                          className={`capitalize flex items-center gap-2 ${
                            theme === t
                              ? "bg-primary text-primary-content font-bold"
                              : ""
                          }`}
                        >
                          <IconComponent className="size-4" />
                          {t}
                          {theme === t && " ✓"}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
