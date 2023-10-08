import { act, renderHook } from "../test/test-utils";
import useLogs, { LOGS_KEY } from "./useLogs";
import {
  EnamReactionAction,
  EnamReactionType,
  IReaction,
} from "../models/IReaction";

const mockLogId = "MOCK_LOG_ID";
const mockLogIdTwo = "MOCK_LOG_ID_TWO";
const mockLogDate = "MOCK_LOG_DATE";
const mockLogItemOne: IReaction = {
  action: EnamReactionAction.AddToLikes,
  type: EnamReactionType.like,
  date: mockLogDate,
  id: mockLogId,
};
const mockLogItemTwo: IReaction = {
  action: EnamReactionAction.AddToDislikes,
  type: EnamReactionType.dislike,
  date: mockLogDate,
  id: mockLogIdTwo,
};

vi.mock("../helpers/getDate.ts", () => ({
  currentTime: () => mockLogDate,
}));

afterEach(() => {
  localStorage.clear();
});

test("initial logs state should be empty", () => {
  const { result } = renderHook(() => useLogs());

  expect(result.current).toEqual({
    logs: [],
    addLog: expect.any(Function),
    removeLog: expect.any(Function),
  });
});

test("add items to logs", () => {
  const mockLogs = [mockLogItemTwo, mockLogItemOne];
  const { result } = renderHook(() => useLogs());

  expect(result.current).toEqual({
    logs: [],
    addLog: expect.any(Function),
    removeLog: expect.any(Function),
  });

  act(() => {
    result.current.addLog(
      EnamReactionType.like,
      EnamReactionAction.AddToLikes,
      mockLogId
    );
  });
  act(() => {
    result.current.addLog(
      EnamReactionType.dislike,
      EnamReactionAction.AddToDislikes,
      mockLogIdTwo
    );
  });

  expect(result.current).toEqual({
    logs: mockLogs,
    addLog: expect.any(Function),
    removeLog: expect.any(Function),
  });
  expect(JSON.parse(localStorage.getItem(LOGS_KEY) as string)).toEqual(
    mockLogs
  );
});

test("remove item from logs", () => {
  const mockLogs = [mockLogItemTwo, mockLogItemOne];
  localStorage.setItem(LOGS_KEY, JSON.stringify(mockLogs));
  const { result } = renderHook(() => useLogs());

  expect(result.current).toEqual({
    logs: mockLogs,
    addLog: expect.any(Function),
    removeLog: expect.any(Function),
  });

  act(() => {
    result.current.removeLog(mockLogId);
  });

  expect(result.current).toEqual({
    logs: [mockLogItemTwo],
    addLog: expect.any(Function),
    removeLog: expect.any(Function),
  });
  expect(JSON.parse(localStorage.getItem(LOGS_KEY) as string)).toEqual([
    mockLogItemTwo,
  ]);
});
