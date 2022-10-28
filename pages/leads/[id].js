import { useRouter } from "next/router";
import useUserDetails from "../../components/hooks/useUserDetails";
import Spinner from "../../components/Spinner";

export default function Home({ params }) {
  const router = useRouter();
  const { id } = router.query;

  const { data, loading } = useUserDetails(id);

  return (
    <div className="container p-8 m-auto">
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <h1 className="font-bold text-center">Your webhook URL</h1>
          <h1 className="text-center">{data.hookUrl}</h1>

          <div className="overflow-x-auto relative mt-8">
            <table className="w-full text-sm text-left text-gray-500 border border-black ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    Name
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Email
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Phone
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.leads.map(({ name, email, phone }, index) => {
                  return (
                    <tr className="bg-white " key={index}>
                      <th
                        scope="row"
                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
                      >
                        {name}
                      </th>
                      <td className="py-4 px-6">{email}</td>
                      <td className="py-4 px-6">{phone}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
