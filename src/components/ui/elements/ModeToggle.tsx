import { Moon, Sun } from "lucide-react"
import { Button } from "@ui/button"
import { useTheme } from "@/components/ThemeProvider"

export function ModeToggle() {
    const { theme, setTheme } = useTheme()

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light")
    }

    return (
        <Button
            variant="link"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle Theme">
            {theme === "light" ? (<Moon/>) : (<Sun/>)}
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}