/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { create } from "zustand";
// import getUser from "./getUser.ts";

type Details = {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  occupation: string;
  location: string;
  profile: {
    public_id: string;
    url: string;
  };
  friends: any[];
  createdAt: string;
};

type PostDetails = {
  img: {
    public_url: string;
    url: string;
  };
  _id: string;
  post: string;
  creator: Details;
  likes: Details[];
  comments: {
    comment: string;
    commentor: string;
    _id: string;
  }[];
  createAt: string;
};

type CommentProps = {
  comment: string;
  commentor: {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    occupation: string;
    location: string;
    profile: {
      public_id: string;
      url: string;
    };
    createdAt: string;
  };
  _id: string;
}[];

type Props = {
  token: string | null;
  userdata: Details | null;
  userFriends: Details[] | null;
  allUsers: Details[] | null;
  userpost: PostDetails | null;
  isLoading: boolean;
  error: string | null;
  allComments: CommentProps | null;
  allPosts: PostDetails[] | null;
  getData: () => Promise<void>;
  getAllPost: () => Promise<void>;
  getToken: () => Promise<void>;
  getPost: (id: string) => Promise<void>;
  getAllComments: (id: string) => Promise<void>;
  getAllUsers: (userID: string) => Promise<void>;
  getUserFriends: (userID: string) => Promise<void>;
};

const baseUrl =
  "https://socio-media-fje1.vercel.app" || "http://localhost:3001";

const DataStore = create<Props>((set) => ({
  token: null,
  userdata: null,
  allUsers: null,
  userpost: null,
  allPosts: null,
  isLoading: false,
  error: null,
  allComments: null,
  userFriends: null,
  getData: async () => {
    try {
      const res = await axios.get(`${baseUrl}/userdata`);
      set({ userdata: res.data.data });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },
  getAllPost: async () => {
    try {
      const res = await axios.get(`${baseUrl}/post`);
      set({ allPosts: res.data.posts });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },
  getToken: async () => {
    try {
      const res = await axios.get(`${baseUrl}/get-cookie`);

      set({ token: res.data.token });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },
  getPost: async (id: string) => {
    try {
      const res = await axios.get(`${baseUrl}/post/user/${id}`);
      set({ userpost: res.data.posts });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },
  getAllComments: async (id: string) => {
    try {
      const res = await axios.get(`${baseUrl}/comment/${id}`);
      set({ allComments: res.data.comments });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },
  getAllUsers: async (userID: string) => {
    try {
      const res = await axios.post(`${baseUrl}/users`, { userID });
      set({ allUsers: res.data.notuserfriends });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },
  getUserFriends: async (userID: string) => {
    try {
      const res = await axios.get(`${baseUrl}/user/friends/${userID}`);
      set({ userFriends: res.data.formattedFriends });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },
}));

export default DataStore;
