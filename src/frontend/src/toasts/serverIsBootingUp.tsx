import toast from "react-hot-toast";

const serverIsBootingUp = () => {
  const t = toast(
    (t) => (
      <span className="flex gap-x-3 py-2">
        <span className="text-4xl self-center">😭</span>
        <span className="flex flex-col">
          <span className="font-bold mb-2 text-gray-800 text-base">
            Our model is taking too long.
          </span>
          <span className="text-gray-700 text-sm">
            Our <b className="font-semibold text-purple-500">Heroku</b> server
            takes a while to cold-start. Please wait for a bit!
          </span>
          <button
            className="mt-2 self-end px-3 py-2 bg-blue-600 text-white rounded-lg"
            onClick={() => toast.dismiss(t.id)}
          >
            I'll wait.
          </button>
        </span>
      </span>
    ),
    {
      duration: 5000,
    }
  );
  return t;
};

export default serverIsBootingUp;
