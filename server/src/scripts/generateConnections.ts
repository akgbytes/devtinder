import mongoose from "mongoose";

const userIds = [
  "68e7efa80861c5bad85417e9", // dont use it Aarav Sharma
  "68e7efa90861c5bad85417f0",
  "68e7efa90861c5bad85417f1",
  "68e7efa90861c5bad85417fb",
  "68e7efa90861c5bad85417fd",
  "68e7efa90861c5bad8541809",
  "68e7efa90861c5bad854180c",
  "68e7efa90861c5bad854180e",
  "68e7efa90861c5bad8541813",
  "68e7efa80861c5bad85417eb",
  "68e7efa90861c5bad85417f6",
  "68e7efa90861c5bad8541800",
  "68e7efa90861c5bad8541802",
  "68e7efa90861c5bad8541808",
  "68e7efa90861c5bad8541814",
  "68e7efa90861c5bad85417f2",
  "68e7efa90861c5bad85417f5",
  "68e7efa90861c5bad85417f9",
  "68e7efa90861c5bad85417fe",
  "68e7efa90861c5bad85417ff",
  "68e7efa90861c5bad8541804",
  "68e7efa90861c5bad8541805",
  "68e7efa90861c5bad8541812",
  "68e7efa90861c5bad8541815",
  "68e7efa90861c5bad854181a",
  "68e7efa80861c5bad85417ec",
  "68e7efa90861c5bad85417ef",
  "68e7efa90861c5bad85417f7",
  "68e7efa90861c5bad8541807",
  "68e7efa90861c5bad854180b", // Ritika, dont use it
  "68e7efa90861c5bad8541810",
  "68e7efa90861c5bad8541811",
  "68e7efa90861c5bad8541817",
  "68e7efa90861c5bad85417f4",
  "68e7efa90861c5bad85417fa",
  "68e7efa90861c5bad85417ee",
  "68e7efa90861c5bad85417f3",
  "68e7efa90861c5bad854180a",
  "68e7efa90861c5bad8541818",
  "68e7efa80861c5bad85417ea",
  "68e7efa90861c5bad85417ed",
  "68e7efa90861c5bad85417fc",
  "68e7efa90861c5bad8541801",
  "68e7efa90861c5bad854180d",
  "68e7efa90861c5bad854180f",
  "68e7efa90861c5bad8541816",
  "68e7efa90861c5bad85417f8",
  "68e7efa90861c5bad8541803",
  "68e7efa90861c5bad8541806",
  "68e7efa90861c5bad8541819",
  "68e80a78a97ab9a3d1ceae94", // my
];

const dummyConnectionUsers = [
  "68e7efa90861c5bad8541809",
  "68e7efa90861c5bad854180c",
  "68e7efa90861c5bad85417f6",
  "68e7efa90861c5bad8541800",
  "68e7efa90861c5bad8541802",
];

const dummyRequestUsers = [
  "68e7efa90861c5bad85417f3",
  "68e7efa90861c5bad854180a",
  "68e7efa90861c5bad8541818",
  "68e7efa80861c5bad85417ea",
  "68e7efa90861c5bad85417ed",
  "68e7efa90861c5bad85417fc",
];

const aaravConnections = dummyConnectionUsers.map((id) => ({
  toUserId: "68e7efa80861c5bad85417e9",
  fromUserId: id,
  status: "accepted",
  _id: new mongoose.Types.ObjectId(),
}));

const ritikaConnections = dummyConnectionUsers.map((id) => ({
  toUserId: "68e7efa90861c5bad854180b",
  fromUserId: id,
  status: "accepted",
  _id: new mongoose.Types.ObjectId(),
}));

const myConnections = dummyConnectionUsers.map((id) => ({
  toUserId: "68e80a78a97ab9a3d1ceae94",
  fromUserId: id,
  status: "accepted",
  _id: new mongoose.Types.ObjectId(),
}));

const aaravRequests = dummyRequestUsers.map((id) => ({
  toUserId: "68e7efa80861c5bad85417e9",
  fromUserId: id,
  status: "interested",
  _id: new mongoose.Types.ObjectId(),
}));

const ritikaRequests = dummyRequestUsers.map((id) => ({
  toUserId: "68e7efa90861c5bad854180b",
  fromUserId: id,
  status: "interested",
  _id: new mongoose.Types.ObjectId(),
}));

const myRequests = dummyRequestUsers.map((id) => ({
  toUserId: "68e80a78a97ab9a3d1ceae94",
  fromUserId: id,
  status: "interested",
  _id: new mongoose.Types.ObjectId(),
}));

export const dummyConnections = [
  ...aaravConnections,
  ...ritikaConnections,
  ...myConnections,
  ...aaravRequests,
  ...ritikaRequests,
  ...myRequests,
];
