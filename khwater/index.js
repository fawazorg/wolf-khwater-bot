const { api } = require("../bot");
const khwater = require("../models/khwater");
const Group = require("../models/group");
const Groups = new Map();

const addKhwater = async (text) => {
  let newKhwater = await khwater.create({ text });
  return newKhwater;
};

const showKhwater = async (id) => {
  let results = await khwater.findOne({ kid: id }).exec();
  return results;
};

const deleteKhwater = async (id) => {
  let results = await khwater.findOneAndDelete({ kid: id }).exec();
  return results;
};

const randomKhwater = async () => {
  let results = await khwater.aggregate([{ $sample: { size: 1 } }]).exec();
  //console.log(results);
  return results[0];
};

const sendRandomKhwaterToGroup = async (gid) => {
  let k = await randomKhwater();
  await updateLast(gid, k.kid);
  return await api.messaging().sendGroupMessage(gid, k.text);
};
const startAllAuto = async () => {
  let groups = await Group.find({ auto: true }).exec();
  for (let i = 0; i < groups.length; i++) {
    const g = groups[i];
    await startGroupAuto(g.gid, g.duration);
  }
};
const startGroupAuto = async (gid, duration) => {
  const isAuto = await isGroupHaveAuto(gid);
  if (isAuto) return false;
  let autoID = setInterval(sendRandomKhwaterToGroup, duration * 60 * 1000, gid);
  Groups.set(gid, { duration, autoID });
  await Group.findOneAndUpdate(
    { gid },
    { auto: true, duration },
    { upsert: true }
  ).exec();
  return true;
};
const stopAuto = async (gid) => {
  const isAuto = await isGroupHaveAuto(gid);
  if (!isAuto) return false;
  let g = Groups.get(gid);
  clearInterval(g.autoID);
  await Group.findOneAndUpdate(
    { gid },
    { auto: false },
    { upsert: true }
  ).exec();
  return true;
};

const updateLast = async (gid, kid) => {
  let arr = await Group.findOne({ gid }).exec();
  arr = addLastToArray(arr.lastK, kid);
  await Group.findOneAndUpdate(
    { gid },
    { lastK: arr },
    { upsert: true }
  ).exec();
};

const getLast = async (gid) => {
  let group = await Group.findOne({ gid }).exec();
  if (!group) {
    return false;
  }
  return group.lastK;
};

const addLastToArray = (arr = [], lastID) => {
  if (arr.length < 10) {
    arr.push(lastID);
    return arr;
  }
  arr.shift();
  arr.push(lastID);
  return arr;
};

const isGroupHaveAuto = async (gid) => {
  const group = await Group.findOne({ gid });
  return group.auto;
};

module.exports = {
  addKhwater,
  showKhwater,
  deleteKhwater,
  sendRandomKhwaterToGroup,
  startAllAuto,
  startGroupAuto,
  stopAuto,
  getLast,
};
