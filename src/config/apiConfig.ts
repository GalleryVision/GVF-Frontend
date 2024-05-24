//const BASE_URL = "http://localhost:5000";
const BASE_URL = "http://13.200.171.128:5000";

const API_ENDPOINTS = {
  // Channel Routes
  ADD_CHANNEL: `${BASE_URL}/add-channel`,
  ASSIGN_CHANNEL: `${BASE_URL}/assign-channel`,
  GET_LINKED_CHANNEL: `${BASE_URL}/get-linked-channel`,
  GET_UNLINKED_CHANNEL: `${BASE_URL}/get-unlinked-channel`,
  GET_CHANNEL: `${BASE_URL}/get-channel`,
  VIEW_CHANNEL: (id: string) => `${BASE_URL}/view-channel/${id}`,
  REMOVE_CHANNEL: (id: string) => `${BASE_URL}/remove-channel/${id}`,
  UPDATE_CHANNEL: (id: string) => `${BASE_URL}/update-channel/${id}`,
  VIEW_RAWCHANNEL: (id: string) => `${BASE_URL}/view-rawchannel/${id}`,
  GET_CHANNEL_INVOICE_ID: `${BASE_URL}/get-channel-invoice-for-channel`,

  // Licensor Routes

  ADD_LICENSOR: `${BASE_URL}/add-licensor`,
  GET_LICENSOR: `${BASE_URL}/get-licensor`,
  VIEW_LICENSOR: (id: string) => `${BASE_URL}/view-licensor/${id}`,
  REMOVE_LICENSOR: (id: string) => `${BASE_URL}/remove-licensor/${id}`,
  UPDATE_LICENSOR: (id: string) => `${BASE_URL}/update-licensor/${id}`,

  // Music Routes
  GET_RAWMUSIC: `${BASE_URL}/get-rawmusic`,
  VIEW_RAWMUSIC: (id: string) => `${BASE_URL}/view-rawmusic/${id}`,
  GET_LINKEDMUSIC: `${BASE_URL}/get-linked-music`,
  ADD_MUSIC: `${BASE_URL}/add-music`,
  DEL_MUSIC: (id: string) => `${BASE_URL}/remove-music/${id}`,
  UPDATE_MUSIC: (id: string) => `${BASE_URL}/update-music/${id}`,
  VIEW_MUSIC: (id: string) => `${BASE_URL}/view-music/${id}`,
  ASSIGN_MUSIC: `${BASE_URL}/assign-music`,

  // Music Invoice Routes
  GENERATE_MUSIC_INVOICE: `${BASE_URL}/generate-music-Invoice`,
  GET_MUSIC_INVOICE: `${BASE_URL}/get-music-Invoice`,
  VIEW_MUSIC_INVOICE: (id: string) => `${BASE_URL}/view-music-Invoice/${id}`,

  // Channel invoice Routes

  GENERATE_CHANNEL_INVOICE: `${BASE_URL}/generate-channel-Invoice`,
  GET_CHANNEL_INVOICE: `${BASE_URL}/get-channel-Invoice`,
  VIEW_CHANNEL_INVOICE: (id: string) =>
    `${BASE_URL}/view-channel-Invoice/${id}`,

  // Login Route
  LOGIN: `${BASE_URL}/login`,

  // Upload CSV
  UPLOADCHANNEL: `${BASE_URL}/channel/importChannel`,
  UPLOADMUSIC: `${BASE_URL}/music/importMusic`,

  // Currency Convertion
  CURRENCY_COVERSTION: `${BASE_URL}/add-currency`,

  // PAYMENT
  CHANGE_CHANNEL_STATUS: (id: string) =>
    `${BASE_URL}/channel-invoice-status/${id}`,
  CHANGE_MUSIC_STATUS: (id: string) => `${BASE_URL}/music-invoice-status/${id}`,
};

export default API_ENDPOINTS;
