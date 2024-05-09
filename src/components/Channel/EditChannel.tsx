import { Close } from "../icons/icon";

type Props = {
  onClose: () => void;
};

const EditChannel = ({ onClose }: Props) => {
  return (
    <div className="px-8 py-8 w-[823px] h-[612px]">
      <div className="flex justify-between">
        <p className="text-2xl font-bold">Edit channel details</p>
        <button onClick={onClose}>
          <Close />
        </button>
      </div>
      <div className="mt-5">
        <div>
          <p>Edit channel logo</p>
          <div className="bg-slate-100 px-4 py-6 w-[723px] h-[184px] rounded-2xl">
            <div className="flex flex-col gap-3 items-center justify-center bg-white w[100%] h-[100%] border-2 border-green-200 border-dashed rounded-2xl">
              <div>logo</div>
              <div className="text-sm font-medium">
                Drop your logo here, or browse
              </div>
              <div className="text-xs">Supports, JPG, PNG</div>
            </div>
          </div>
        </div>
        <div className=" py-6 flex justify-between">
          <div className="flex flex-col gap-4">
            <label htmlFor="">Select licensor</label>
            <input
              type="text"
              placeholder={`Select licensor `}
              className="px-3 py-3 w-[225px] border border-gray-200 rounded-lg "
            />
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor="">Channel ID</label>
            <input
              type="text"
              placeholder={`Channel ID `}
              className="px-3 py-3 w-[225px] border border-gray-200 rounded-lg "
            />
          </div>{" "}
          <div className="flex flex-col gap-4">
            <label htmlFor="">Channel name</label>
            <input
              type="text"
              placeholder={`Channel name `}
              className="px-3 py-3 w-[225px] border border-gray-200 rounded-lg"
            />
          </div>
        </div>{" "}
        <div className="flex justify-between">
          <div className="flex flex-col gap-4">
            <label htmlFor="">Email</label>
            <input
              type="email"
              placeholder={`Select licensor `}
              className="px-3 py-3 w-[358px] border border-gray-200 rounded-lg "
            />
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor="">Commission (%)</label>
            <input
              type="number"
              placeholder={`Channel ID `}
              className="px-3 py-3 w-[358px] border border-gray-200 rounded-lg "
            />
          </div>{" "}
        </div>
        <div className="flex justify-end pt-5">
          <button
            onClick={onClose}
            className=" bg-black text-white font-bold px-2 py-2 rounded-lg"
          >
            Add & Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditChannel;