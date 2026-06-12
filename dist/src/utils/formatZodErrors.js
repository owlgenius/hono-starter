export function formatZodErrors(error) {
    const fields = {};
    for (const issue of error.issues) {
        const field = issue.path.length > 0
            ? issue.path.map(String).join(".")
            : "root";
        if (!fields[field]) {
            fields[field] = issue.message;
        }
    }
    return fields;
}
