import React, {
  Dispatch,
  Fragment,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Dialog, Transition } from "@headlessui/react";

// Icons
import {
  FiArrowLeft as ArrowIcon,
  FiSettings as SettingsIcon,
} from "react-icons/fi";
import { RiEyeLine as ViewDetailsIcon } from "react-icons/ri";
import { MdBugReport as BugIcon } from "react-icons/md";
import { HiChatAlt as SupportIcon } from "react-icons/hi";
import { TbFaceIdError as APIErrorIcon } from "react-icons/tb";

// Components
import Switch from "../Switch/Switch";
import ImageUploadBox from "../ImageUploadBox";
import Dropdown from "../Dropdown";
import Tippy from "@tippyjs/react";
import uploadFile from "../../services/uploadFile";
import PolygonIcon from "../PolygonIcon";

import useServerDelayInformer from "@/hooks/useServerDelayInformer";

type MainAppWindowProps = {
  file?: ISelectedFile;
  isShowing: boolean;
  setShowing: Dispatch<SetStateAction<boolean>>;
};

const MainAppWindow: React.FC<MainAppWindowProps> = ({
  isShowing,
  setShowing,
  file,
}) => {
  // Functions
  function closeModal() {
    setShowing(false);
  }

  async function fetchData(file: ISelectedFile) {
    sdInformer.start();
    setLoading(true);
    try {
      const response = await uploadFile(file);
      console.log(response.data);
      setSegmentationResponse(response.data);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
    sdInformer.cancel();
  }

  //   Hooks
  const sdInformer = useServerDelayInformer();
  const [segmentationResponse, setSegmentationResponse] =
    useState<ISegmentationResponse>();
  const [enabled, setEnabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (file !== undefined) {
      //   File is not undefined, we can upload the file
      console.log("File is not null, we can upload.");
      setShowing(true);
      fetchData(file);
    } else {
      // File is undefined, we can't upload
      console.log("File is null, we can't upload.");
    }
  }, [file]);

  return (
    <Transition appear show={isShowing} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => {}}>
        {/* Actual Body of the Dialog is within Dialog.Panel */}
        <div className="fixed inset-0 overflow-y-auto bg-white z-10">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300 will-change"
            enterFrom="scale-95"
            enterTo="scale-100"
            leave="ease-in duration-200 will-change"
            leaveFrom="scale-100"
            leaveTo="scale-95"
          >
            {/* CONTENT OF THE WINDOW IS HERE!! */}
            <div className="w-full h-full transform overflow-hidden bg-white p-6 transition-all flex flex-col ">
              {/* Nav */}
              <nav className="flex gap-5 justify-between h-12 text-gray-800 flex-shrink-0">
                <div className="h-full">
                  <button
                    type="button"
                    onClick={() => {
                      window.scrollTo(0, 0);
                      closeModal();
                    }}
                    className="flex h-full px-5 items-center gap-2 border rounded-xl text-sm hover:bg-blue-700 hover:text-white hover:shadow-md"
                  >
                    <ArrowIcon size="1.2rem" />
                    <span>Start New </span>
                  </button>
                </div>
                <div className="h-full flex gap-8">
                  <div className="self-center flex items-center gap-x-2">
                    <Tippy content="View Details">
                      <button
                        type="button"
                        onClick={() => setEnabled((prev) => !prev)}
                      >
                        <ViewDetailsIcon
                          className="text-center text-gray-800"
                          size="1.5rem"
                        />
                      </button>
                    </Tippy>
                    <Switch enabled={enabled} setEnabled={setEnabled} />
                  </div>
                  <Dropdown
                    className="flex h-full px-5 items-center gap-2 border rounded-xl text-sm hover:bg-blue-700 hover:text-white hover:shadow-md text-gray-800"
                    openClass="bg-blue-700 text-white"
                    items={[
                      { label: "Report a Bug", Icon: BugIcon },
                      { label: "Contact Support", Icon: SupportIcon },
                    ]}
                  >
                    <SettingsIcon size="1.2rem" />
                  </Dropdown>
                </div>
              </nav>
              <main className="w-full flex-grow grid grid-cols-3 gap-8 overflow-hidden">
                {/* COL 1 */}
                <div className="flex flex-col overflow-hidden">
                  <div className="text-center py-5">
                    <h1 className="font-bold text-gray-700 truncate">
                      Input Spine Image
                    </h1>
                  </div>
                  {file ? (
                    <div className="relative flex-grow flex justify-center items-center border-2 border-dashed rounded-xl overflow-hidden">
                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300 will-change"
                        enterFrom="scale-50"
                        enterTo="scale-100"
                        leave="ease-in duration-200 will-change"
                        leaveFrom="scale-100"
                        leaveTo="scale-50"
                      >
                        {/* <img
                          src={`${file.preview}`}
                          className="object-contain w-11/12 h-5/6"
                        /> */}
                      </Transition.Child>
                    </div>
                  ) : (
                    <>
                      <div className="w-full h-full flex">
                        <ImageUploadBox file={file} />
                      </div>
                    </>
                  )}
                </div>
                {/* COL 2 */}
                <div className="flex flex-col overflow-hidden">
                  <div className="text-center py-5">
                    <h1 className="font-manrope font-bold text-gray-700 truncate">
                      Landmark Estimation
                    </h1>
                  </div>
                  <div className="relative flex-grow flex justify-center items-center border-2 border-dashed rounded-xl overflow-hidden">
                    {loading ? (
                      <div className="flex flex-col items-center gap-y-5 px-5">
                        <PolygonIcon />
                        <span className="text-sm text-gray-500 text-center">
                          Model is calculating...
                        </span>
                        {sdInformer.delayInformerIsVisible && (
                          <span className="absolute top-10 mx-8 text-xs text-gray-600 text-center bg-yellow-300 bg-opacity-90 rounded-md px-3 py-5 shadow-md">
                            <h5 className="text-sm font-bold mb-2 text-gray-800">
                              😥 Waiting Too Long?
                            </h5>
                            Our{" "}
                            <b className="font-bold text-purple-600">
                              Heroku server
                            </b>{" "}
                            is still cold-starting after sleeping. Please wait
                            for a bit! It should take under a minute.
                            <br />
                            <br />
                            After that, processing another image will only take
                            2 seconds.
                          </span>
                        )}
                      </div>
                    ) : (
                      <>
                        {segmentationResponse &&
                          segmentationResponse.encoded_img && (
                            <>
                              {/* <img
                                src={`data:image/png;base64,${segmentationResponse.encoded_img}`}
                                className="object-contain w-11/12 h-5/6"
                              /> */}
                            </>
                          )}
                      </>
                    )}
                    {!loading && file && !segmentationResponse && (
                      <div className="flex flex-col items-center gap-y-5 px-16 text-center">
                        <APIErrorIcon size="3rem" className="text-red-400" />
                        <span className="text-sm text-red-400">
                          Failed to analyze the image. The ScolioVis server
                          might not be running.
                        </span>
                        <button
                          onClick={() => {
                            if (!file) return;
                            fetchData(file);
                          }}
                          className="border border-red-400 px-8 py-2 text-red-400 rounded-xl hover:bg-red-400 hover:text-white"
                        >
                          Retry
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                {/* COL 3 */}
                <div className="flex flex-col">
                  <div className="text-center py-5">
                    <h1 className="font-bold text-gray-700 truncate">
                      Cobb Angle Measurement
                    </h1>
                  </div>
                  <div className="flex-grow flex items-center border-2 border-dashed justify-center rounded-xl">
                    {/* Cobb Angle Placeholder */}
                  </div>
                </div>
              </main>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default MainAppWindow;
