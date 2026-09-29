import { supabase } from "$lib/supabaseClient.js";

// Global singleton auth state
let user = $state(null);

/**
 * Initializes the global authentication listener.
 * This should only be called once, typically in +layout.svelte.
 */
export function initAuth() {
    // Check if there is already a logged in user
    supabase.auth.getSession().then(({ data }) => {
        user = data.session?.user ?? null;
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        user = session?.user ?? null;
    });

    // Return cleanup function
    return () => subscription.unsubscribe();
}

/**
 * Returns the global authenticated user state.
 */
export function getAuth() {
    return {
        get user() { return user; }
    };
}

export function useValidation() {
    // Export reactive state
    let validate = $state(false);

    // Clears the Bootstrap 'was-validated' state, so validation errors
    // don't stay visible on the form after a failed submit.
    const reset = () => {
        validate = false;
    };

    // Method 1: For SvelteKit forms (use:enhance) like QuestionBox
    const serverSubmit = ({ cancel, formElement }) => {
        validate = true;
        if (!formElement.checkValidity()) {
            cancel();
            return;
        }
        return async ({ update }) => {
            await update();
            validate = false; // Reset after submission
        };
    };

    // Method 2: For Javascript forms (Login, Profile)
    const clientSubmit = (formElement) => {
        validate = true;
        return formElement.checkValidity(); // Returns true if valid, false if errors
    };

    return {
        get isActive() { return validate; },
        reset,
        serverSubmit,
        clientSubmit
    };
}

export function setupProfileIcon(name) {
    const NAMES = (name || "").split(" ").filter(Boolean);
    let result = "";

    let length = 0;
    NAMES.forEach((element) => {
        if (length >= 2) return result;
        result += element.charAt(0);
        length++;
    });

    return result;
}

/**
 * Derives a stable hue (0-359) from a name, so the same user always gets
 * the same avatar colour across visits and across pages.
 *
 * @param {string} name - The name to derive the hue from.
 * @returns {number} A hue in the [0, 359] range.
 */
export function nameToHue(name) {
    let hash = 0;
    const value = name || "";

    for (let i = 0; i < value.length; i++) {
        hash = value.charCodeAt(i) + ((hash << 5) - hash);
    }

    return Math.abs(hash) % 360;
}

/**
 * Builds the CSS background colour for an avatar, deterministically derived
 * from the name. Saturation and lightness are fixed to keep white text readable.
 *
 * @param {string} name - The name to derive the colour from.
 * @returns {string} An hsl() colour string.
 */
export function profileIconColor(name) {
    return `hsl(${nameToHue(name)}, 70%, 50%)`;
}