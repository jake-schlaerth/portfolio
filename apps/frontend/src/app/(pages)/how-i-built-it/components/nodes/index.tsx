import { InformationNode } from "./InformationNode";
import { StandardNode } from "./StandardNode";

export const customNodeTypes = {
  standardNode: StandardNode,
  informationNode: InformationNode,
};

export const nodes = [
  {
    id: "browser-1",
    position: { x: 0, y: 0 },
    data: { name: "frontend" },
    type: "standardNode",
  },
  {
    id: "browser-2",
    position: { x: 300, y: 0 },
    data: { name: "frontend" },
    type: "standardNode",
  },
  {
    id: "kafka",
    position: { x: 0, y: 100 },
    data: { name: "kafka" },
    type: "standardNode",
  },
  {
    id: "analytics-streamer",
    position: { x: 300, y: 100 },
    data: { name: "analytics-streamer" },
    type: "standardNode",
  },
  {
    id: "analytics-writer",
    position: { x: 0, y: 200 },
    data: { name: "analytics-writer" },
    type: "standardNode",
  },
  {
    id: "redis",
    position: { x: 150, y: -100 },
    data: { name: "redis" },
    type: "standardNode",
  },
  {
    id: "database",
    position: { x: 0, y: 300 },
    data: { name: "database" },
    type: "standardNode",
  },
  {
    id: "information",
    position: { x: 235, y: 200 },
    data: {
      blurb: `message are pushed to a kafka topic by the client browser.\
        the analytics-streamer service consumes from this topic and broadcasts messages to each connected websocket client. \
        likewise, the analytics-writer service consumes messages and persists them to a postgres database.\
        on inital load, the client connects to the websocket server and queries redis for all historical data. \
        on a redis cache miss, the browser queries postgres for historical data and updates the redis cache.`,
    },
    type: "informationNode",
  },
];
