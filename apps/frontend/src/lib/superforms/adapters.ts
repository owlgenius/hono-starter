// Superforms' adapter barrel imports every optional validation adapter. Vite 8/Rolldown
// validates those optional imports before tree-shaking, so expose only the official
// Zod v4 adapters this app uses.
export {
  zod as zod4,
  zodClient as zod4Client,
} from "../../../../../node_modules/sveltekit-superforms/dist/adapters/zod4.js";
