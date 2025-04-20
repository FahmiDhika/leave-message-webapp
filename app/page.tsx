import { IPost } from "./types";
import { BASE_API_URL } from "@/global";
import { get } from "@/lib/api-bridge";
import NewPost from "@/components/newPost";
import { AlertInfo } from "@/components/alert";

const getAllMessage = async (): Promise<IPost[]> => {
  try {
    const url = `${BASE_API_URL}/message/get`;
    const { data } = await get(url);
    let result: IPost[] = [];
    if (data?.status) result = [...data.data];
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const colorVariants = [
  "bg-blue-100",
  "bg-yellow-100",
  "bg-green-100",
  "bg-blue-100",
  "bg-red-100",
  "bg-amber-100",
  "bg-pink-100",
  "bg-fuchsia-100",
  "bg-cyan-100",
  "bg-indigo-100",
];

export default async function Home() {
  const message: IPost[] = await getAllMessage();

  return (
    <main className="w-full min-h-dvh main-bg text-4xl px-4 lg:px-32 font-semibold py-9">
      <div className="flex justify-between items-center">
        <h1 className="w-fit text-xl text-white lg:text-3xl h-fit pb-2 px-2 border-b-2">
          leave me a message
        </h1>
        <NewPost />
      </div>
      <p className="text-sm lg:text-lg font-normal text-gray-200 mb-14">
        Your thoughts, messages, and vibes.
      </p>

      <div className="max-h-dvh overflow-y-auto flex flex-wrap gap-4 justify-center items-center scroll-hidden">
        {message.length == 0 ? (
          <AlertInfo title="Informasi">Belum ada pesan...</AlertInfo>
        ) : (
          <>
            {message.map((data, index) => (
              <div
                key={`keyPrestasi${index}`}
                className={`w-full lg:w-fit h-auto py-4 px-6 border-2 bg-amber-200 rounded-2xl shadow-xl ${
                  colorVariants[index % colorVariants.length]
                }`}
              >
                <h1 className="text-2xl font-bold tracking-widest">
                  {data.author}
                </h1>
                <p className="text-lg font-normal">{data.message}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </main>
  );
}
