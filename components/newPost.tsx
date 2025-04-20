"use client";

import { FormEvent, useState, useRef } from "react";
import { IPost } from "@/app/types";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { BASE_API_URL } from "@/global";
import { newPost } from "@/lib/api-bridge";
import Modal from "./modal/index";
import { Input } from "./inputComponents/index";

const NewPost = () => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const [post, setPost] = useState<IPost>({
    id: 0,
    uuid: ``,
    author: ``,
    message: ``,
    createdAt: ``,
    updatedAt: ``,
  });

  const openModal = () => {
    setPost({
      id: 0,
      uuid: ``,
      author: ``,
      message: ``,
      createdAt: ``,
      updatedAt: ``,
    });
    setIsShow(true);
    if (formRef.current) formRef.current.reset();
  };

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const url = `${BASE_API_URL}/message/post`;
      const { author, message } = post;
      const payload = new FormData();
      payload.append("author", author || "");
      payload.append("message", message || "");

      const { data } = await newPost(url, payload);

      if (data?.status) {
        setIsShow(false);
        toast(data?.message, {
          hideProgressBar: false,
          containerId: `toastMessage`,
          type: `success`,
        });
        setTimeout(() => router.refresh(), 1000);
      } else {
        toast(data?.message, {
          hideProgressBar: false,
          containerId: `toastMessage`,
          type: `warning`,
        });
      }
    } catch (error) {
      console.log(error);
      toast(`Something Wrong`, {
        hideProgressBar: false,
        containerId: `toastMessage`,
        type: `error`,
      });
    }
  };

  return (
    <div>
      <button
        onClick={() => openModal()}
        className="text-lg lg:text-3xl bg- rounded-xl px-4 py-2 hover:cursor-pointer border-0 text-white bg-sky-700 hover:bg-sky-800 transition ease-in-out duration-300"
        type="button"
      >
        + Post
      </button>

      <Modal isShow={isShow} onClose={(state) => setIsShow(state)}>
        <form onSubmit={handleSubmit}>
          <div className="text-black py-6 px-16 text-center w-full flex flex-col justify-center items-center">
            <h1 className="text-3xl mb-9">give me a new message</h1>

            <div className="text-start">
              <label className="text-lg pl-2 font-normal">Name</label>
              <Input
                id={`author`}
                value={post.author}
                onChange={(val) => setPost({ ...post, author: val })}
                placeholder={`Your Name...`}
                className={``}
                required={true}
              />

              <label className="text-lg pl-2 font-normal">Message</label>
              <Input
                id={`message`}
                value={post.message}
                onChange={(val) => setPost({ ...post, message: val })}
                  placeholder={`Your Message...`}
                className={`mb-14`}
                required={true}
              />

              <div className="w-full flex justify-between">
                <button
                  className="text-lg text-white bg-red-500 px-4 py-2 rounded-2xl"
                  type="button"
                  onClick={() => setIsShow(false)}
                >
                  cancel
                </button>
                <button
                  className="text-lg text-white bg-green-500 px-4 py-2 rounded-2xl"
                  type="submit"
                >
                  sent
                </button>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default NewPost;
