import { useEffect, useState } from "react";
import axios from "axios";
import API_ENDPOINTS from "../../config/apiConfig";
import { authInstance } from "../../hooks/axiosInstances";

type Props = {};

type Count = {
  channelCount: number;
  musicCount: number;
  licensorCount: number;
  totalCommission: number;
  totalchannelCommission: number;
  totalMusicCommission: number;
};

const card = "flex flex-col py-3 gap-3 px-3 w-[150%] rounded-2xl bg-white";

const Cards: React.FC<Props> = ({}: Props) => {
  const [count, setCount] = useState<Count>({
    channelCount: 0,
    musicCount: 0,
    licensorCount: 0,
    totalCommission: 0,
    totalchannelCommission: 0,
    totalMusicCommission: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Count>(API_ENDPOINTS.VIEW_COUNT,{headers:authInstance()});
        const formattedData = formatCountData(response.data);
        setCount(formattedData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const formatCountData = (data: Count): Count => {
    return {
      channelCount: parseFloat(data.channelCount.toFixed(2)),
      musicCount: parseFloat(data.musicCount.toFixed(2)),
      licensorCount: parseFloat(data.licensorCount.toFixed(2)),
      totalCommission: parseFloat(data.totalCommission.toFixed(2)),
      totalchannelCommission: parseFloat(data.totalchannelCommission.toFixed(2)),
      totalMusicCommission: parseFloat(data.totalMusicCommission.toFixed(2)),
    };
  };

  return (
    <div className="flex gap-4 mx-8">
      <TotalRevenue totalCommision={count.totalCommission} />
      <TotalLicensor licensorCount={count.licensorCount} />
      <TotalChannel
        channelCount={count.channelCount}
        totalchannelCommission={count.totalchannelCommission}
      />
      <TotalMusic
        musicCount={count.musicCount}
        totalMusicCommission={count.totalMusicCommission}
      />
    </div>
  );
};

export default Cards;

function TotalRevenue({ totalCommision }: { totalCommision: number }) {
  return (
    <div className={`${card}`}>
      <p className="text-sm font-bold  text-gray-600">Total Revenue</p>
      <p className="text-2xl font-bold">$ {totalCommision.toFixed(2)}</p>
    </div>
  );
}

function TotalLicensor({ licensorCount }: { licensorCount: number }) {
  return (
    <div className={`${card}`}>
      <p className="text-sm font-bold text-gray-600">Total Licensor</p>
      <p className="text-2xl font-bold">{licensorCount.toFixed()}</p>
    </div>
  );
}

function TotalChannel({
  channelCount,
  totalchannelCommission,
}: {
  channelCount: number;
  totalchannelCommission: number;
}) {
  return (
    <div className={`${card}`}>
      <p className="text-sm font-bold text-gray-600">Total Channel</p>
      <p className="text-2xl font-bold">{channelCount.toFixed()}</p>
      <div className="text-sm font-bold flex items-center gap-2">
        <p className="text-sm font-bold text-gray-600">Total Commission</p>
        <p className="text-xl font-bold">$ {totalchannelCommission.toFixed(2)}</p>
      </div>
    </div>
  );
}

function TotalMusic({
  musicCount,
  totalMusicCommission,
}: {
  musicCount: number;
  totalMusicCommission: number;
}) {
  return (
    <div className={`${card}`}>
      <p className="text-sm font-bold text-gray-600">Total Music</p>
      <p className="text-2xl font-bold">{musicCount.toFixed()}</p>
      <div className="text-sm font-bold flex items-center gap-2">
        <p className="text-sm font-bold text-gray-600">Total Commission</p>
        <p className="text-xl font-bold">$ {totalMusicCommission.toFixed(2)}</p>
      </div>
    </div>
  );
}
