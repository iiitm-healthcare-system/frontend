export function getErrorMessage(error: any) {
  return (
    error.response?.data?.errors?.[0]?.message ||
    error.response?.data?.message ||
    error.message ||
    error
  );
}
