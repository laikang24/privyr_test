import { useEffect, useState } from "react";

/**
 * Custom hook for fetching user details
 */
const useUserDetails = (id) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`/api/user/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setData({
            hookUrl: `${window.location.origin}/webhook/${data.hookId}`,
            leads: data.leads ?? [],
          });
          setLoading(false);
        });
    }
  }, [id]);

  return { data, loading };
};

export default useUserDetails;
