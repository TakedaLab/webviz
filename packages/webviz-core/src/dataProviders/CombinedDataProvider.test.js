// @flow
//
//  Copyright (c) 2018-present, Cruise LLC
//
//  This source code is licensed under the Apache License, Version 2.0,
//  found in the LICENSE file in the root directory of this source tree.
//  You may not use this file except in compliance with the License.

//  Copyright (c) 2018-present, Cruise LLC
//
//  This source code is licensed under the Apache License, Version 2.0,
//  found in the LICENSE file in the root directory of this source tree.
//  You may not use this file except in compliance with the License.

import CombinedDataProvider, { mergedBlocks } from "webviz-core/src/dataProviders/CombinedDataProvider";
import MemoryDataProvider from "webviz-core/src/dataProviders/MemoryDataProvider";
import { mockExtensionPoint } from "webviz-core/src/dataProviders/mockExtensionPoint";
import { SECOND_SOURCE_PREFIX } from "webviz-core/src/util/globalConstants";

// reusable providers
function provider1(initiallyLoaded = false) {
  return new MemoryDataProvider({
    messages: [
      { topic: "/some_topic1", receiveTime: { sec: 101, nsec: 0 }, message: { value: 1 } },
      { topic: "/some_topic1", receiveTime: { sec: 103, nsec: 0 }, message: { value: 3 } },
    ],
    topics: [{ name: "/some_topic1", datatype: "some_datatype" }],
    datatypes: {},
    initiallyLoaded,
    providesParsedMessages: true,
  });
}

function provider1Duplicate() {
  return new MemoryDataProvider({
    messages: [
      { topic: "/some_topic1", receiveTime: { sec: 101, nsec: 0 }, message: { value: 1 } },
      { topic: "/some_topic1", receiveTime: { sec: 103, nsec: 0 }, message: { value: 3 } },
    ],
    topics: [{ name: "/some_topic1", datatype: "some_datatype" }],
    datatypes: {},
    providesParsedMessages: true,
  });
}

function provider2() {
  return new MemoryDataProvider({
    messages: [{ topic: "/some_topic2", receiveTime: { sec: 102, nsec: 0 }, message: { value: 2 } }],
    topics: [{ name: "/some_topic2", datatype: "some_datatype" }],
    datatypes: {},
    providesParsedMessages: true,
  });
}

function provider3() {
  return new MemoryDataProvider({
    messages: [
      { topic: "/some_topic3", receiveTime: { sec: 100, nsec: 0 }, message: { value: 3 } },
      { topic: "/some_topic3", receiveTime: { sec: 102, nsec: 0 }, message: { value: 3 } },
      { topic: "/some_topic3", receiveTime: { sec: 104, nsec: 0 }, message: { value: 3 } },
    ],
    topics: [{ name: "/some_topic3", datatype: "some_datatype" }],
    datatypes: {},
    providesParsedMessages: true,
  });
}

function getCombinedDataProvider(data: any[]) {
  const providerInfos = [];
  const children = [];
  for (const item of data) {
    const { provider, deleteTopics, prefix } = item;
    providerInfos.push({ deleteTopics, prefix });
    children.push({ name: "TestProvider", args: { provider }, children: [] });
  }
  return new CombinedDataProvider({ providerInfos }, children, () => {
    throw new Error("Should never be called");
  });
}

describe("CombinedDataProvider", () => {
  describe("error handling", () => {
    it("throws if a prefix does not have a leading forward slash", () => {
      expect(() =>
        getCombinedDataProvider([{ provider: provider1(), prefix: "foo" }, { provider: provider2() }])
      ).toThrow();
    });

    it("throws if two providers have the same topics without a prefix", async () => {
      const combinedProvider = getCombinedDataProvider([{ provider: provider1() }, { provider: provider1Duplicate() }]);
      await expect(combinedProvider.initialize(mockExtensionPoint().extensionPoint)).rejects.toThrow();
    });

    it("should not allow duplicate topics", async () => {
      const p1 = new MemoryDataProvider({
        messages: [{ topic: "/some_topic", receiveTime: { sec: 101, nsec: 0 }, message: { value: 1 } }],
        topics: [{ name: "/some_topic", datatype: "some_datatype" }],
        datatypes: {},
        providesParsedMessages: true,
      });
      const p2 = new MemoryDataProvider({
        messages: [{ topic: "/some_topic", receiveTime: { sec: 101, nsec: 0 }, message: { value: 1 } }],
        topics: [{ name: "/generic_topic/some_topic", datatype: "some_datatype" }],
        datatypes: {},
        providesParsedMessages: true,
      });
      const combinedProvider = getCombinedDataProvider([{ provider: p1, prefix: "/generic_topic" }, { provider: p2 }]);
      await expect(combinedProvider.initialize(mockExtensionPoint().extensionPoint)).rejects.toThrow();
    });

    it("should not allow conflicting datatypes", async () => {
      const p1 = new MemoryDataProvider({
        messages: [{ topic: "/some_topic", receiveTime: { sec: 101, nsec: 0 }, message: { value: 1 } }],
        topics: [{ name: "/some_topic", datatype: "some_datatype" }],
        datatypes: {
          some_datatype: {
            fields: [
              {
                name: "some_string",
                type: "string",
              },
            ],
          },
        },
        providesParsedMessages: true,
      });

      const p2 = new MemoryDataProvider({
        messages: [{ topic: "/some_topic", receiveTime: { sec: 101, nsec: 0 }, message: { value: 1 } }],
        topics: [{ name: "/some_topic", datatype: "some_datatype" }],
        datatypes: {
          some_datatype: {
            fields: [
              {
                name: "some_string",
                type: "number",
              },
            ],
          },
        },
        providesParsedMessages: true,
      });
      const combinedProvider = getCombinedDataProvider([{ provider: p1, prefix: "/some_prefix" }, { provider: p2 }]);
      await expect(combinedProvider.initialize(mockExtensionPoint().extensionPoint)).rejects.toThrow();
    });
  });

  describe("features", () => {
    it("combines initialization data", async () => {
      const combinedProvider = getCombinedDataProvider([
        { provider: provider1() },
        { provider: provider3(), prefix: SECOND_SOURCE_PREFIX },
        { provider: provider2(), prefix: "/table_1" },
      ]);
      expect(await combinedProvider.initialize(mockExtensionPoint().extensionPoint)).toEqual({
        start: { nsec: 0, sec: 100 },
        end: { nsec: 0, sec: 104 },
        topics: [
          { datatype: "some_datatype", name: "/some_topic1" },
          { datatype: "some_datatype", name: `${SECOND_SOURCE_PREFIX}/some_topic3`, originalTopic: "/some_topic3" },
          { datatype: "some_datatype", name: "/table_1/some_topic2", originalTopic: "/some_topic2" },
        ],
        datatypes: {},
        messageDefinitionsByTopic: {},
        providesParsedMessages: true,
      });
    });

    describe("deleting topics", () => {
      function providerWithTopicToDelete() {
        return new MemoryDataProvider({
          messages: [
            { topic: "/some_topic1", receiveTime: { sec: 101, nsec: 0 }, message: { value: 1 } },
            { topic: "/some_topic2", receiveTime: { sec: 103, nsec: 0 }, message: { value: 3 } },
          ],
          topics: [
            { name: "/some_topic1", datatype: "some_datatype" },
            { name: "/some_topic2", datatype: "some_datatype" },
          ],
          datatypes: {},
          providesParsedMessages: true,
        });
      }

      it("deletes topics from providers without prefixes", async () => {
        const combinedProvider = getCombinedDataProvider([
          { provider: provider1() },
          {
            provider: providerWithTopicToDelete(),
            deleteTopics: ["/some_topic1"],
          },
        ]);
        expect(await combinedProvider.initialize(mockExtensionPoint().extensionPoint)).toEqual({
          start: { nsec: 0, sec: 101 },
          end: { nsec: 0, sec: 103 },
          topics: [
            { datatype: "some_datatype", name: "/some_topic1" },
            { datatype: "some_datatype", name: "/some_topic2" },
          ],
          datatypes: {},
          messageDefinitionsByTopic: {},
          providesParsedMessages: true,
        });
      });

      it("deletes topics from providers with prefixes", async () => {
        const combinedProvider = getCombinedDataProvider([
          { provider: provider1() },
          {
            provider: providerWithTopicToDelete(),
            prefix: "/table_1",
            deleteTopics: ["/some_topic1"],
          },
        ]);
        expect(await combinedProvider.initialize(mockExtensionPoint().extensionPoint)).toEqual({
          start: { nsec: 0, sec: 101 },
          end: { nsec: 0, sec: 103 },
          topics: [
            { datatype: "some_datatype", name: "/some_topic1" },
            { datatype: "some_datatype", name: "/table_1/some_topic2", originalTopic: "/some_topic2" },
          ],
          datatypes: {},
          messageDefinitionsByTopic: {},
          providesParsedMessages: true,
        });
      });

      it("removes deleted topics from getMessages calls", async () => {
        const p1 = provider1();
        const p2 = providerWithTopicToDelete();
        const combinedProvider = getCombinedDataProvider([
          { provider: p1 },
          { provider: p2, deleteTopics: ["/some_topic1"] },
        ]);
        await combinedProvider.initialize(mockExtensionPoint().extensionPoint);
        jest.spyOn(p1, "getMessages");
        jest.spyOn(p2, "getMessages");
        await combinedProvider.getMessages({ nsec: 0, sec: 101 }, { nsec: 0, sec: 103 }, [
          "/some_topic1",
          "/some_topic2",
        ]);
        expect(p1.getMessages.mock.calls[0][2]).toEqual(["/some_topic1"]);
        expect(p2.getMessages.mock.calls[0][2]).toEqual(["/some_topic2"]);
      });
    });

    it("combines messages", async () => {
      const combinedProvider = getCombinedDataProvider([
        { provider: provider1() },
        { provider: provider1Duplicate(), prefix: SECOND_SOURCE_PREFIX },
      ]);
      await combinedProvider.initialize(mockExtensionPoint().extensionPoint);
      expect(
        await combinedProvider.getMessages({ sec: 101, nsec: 0 }, { sec: 103, nsec: 0 }, [
          "/some_topic1",
          `${SECOND_SOURCE_PREFIX}/some_topic1`,
        ])
      ).toEqual([
        { message: { value: 1 }, receiveTime: { nsec: 0, sec: 101 }, topic: "/some_topic1" },
        { message: { value: 1 }, receiveTime: { nsec: 0, sec: 101 }, topic: `${SECOND_SOURCE_PREFIX}/some_topic1` },
        { message: { value: 3 }, receiveTime: { nsec: 0, sec: 103 }, topic: "/some_topic1" },
        { message: { value: 3 }, receiveTime: { nsec: 0, sec: 103 }, topic: `${SECOND_SOURCE_PREFIX}/some_topic1` },
      ]);
    });

    it("allows customization of prefixes", async () => {
      const combinedProvider = getCombinedDataProvider([
        { provider: provider1(), prefix: "/table_1" },
        { provider: provider2(), prefix: "/table_2" },
      ]);
      expect(await combinedProvider.initialize(mockExtensionPoint().extensionPoint)).toEqual({
        datatypes: {},
        end: { nsec: 0, sec: 103 },
        start: { nsec: 0, sec: 101 },
        topics: [
          { name: `/table_1/some_topic1`, originalTopic: "/some_topic1", datatype: "some_datatype" },
          { name: `/table_2/some_topic2`, originalTopic: "/some_topic2", datatype: "some_datatype" },
        ],
        providesParsedMessages: true,
        messageDefinitionsByTopic: {},
      });
    });

    it("does not call getMessages with out of bound times", async () => {
      const p1 = new MemoryDataProvider({
        messages: [
          { topic: "/some_topic", receiveTime: { sec: 100, nsec: 0 }, message: undefined },
          { topic: "/some_topic", receiveTime: { sec: 130, nsec: 0 }, message: undefined },
        ],
        topics: [{ name: "/some_topic", datatype: "some_datatype" }],
        datatypes: {},
        providesParsedMessages: true,
      });
      jest.spyOn(p1, "getMessages");
      const p2 = new MemoryDataProvider({
        messages: [
          { topic: "/some_topic2", receiveTime: { sec: 170, nsec: 0 }, message: undefined },
          { topic: "/some_topic2", receiveTime: { sec: 200, nsec: 0 }, message: undefined },
        ],
        topics: [{ name: "/some_topic2", datatype: "some_datatype" }],
        datatypes: {},
        providesParsedMessages: true,
      });
      jest.spyOn(p2, "getMessages");
      const combinedProvider = getCombinedDataProvider([{ provider: p1 }, { provider: p2 }]);
      const result = await combinedProvider.initialize(mockExtensionPoint().extensionPoint);

      // Sanity check:
      expect(result.start).toEqual({ sec: 100, nsec: 0 });
      expect(result.end).toEqual({ sec: 200, nsec: 0 });

      const messages = await combinedProvider.getMessages({ sec: 100, nsec: 0 }, { sec: 150, nsec: 0 }, [
        "/some_topic",
        "/some_topic2",
      ]);
      expect(messages.length).toEqual(2);
      expect(p1.getMessages.mock.calls[0]).toEqual([{ sec: 100, nsec: 0 }, { sec: 130, nsec: 0 }, ["/some_topic"]]);
      expect(p2.getMessages.mock.calls.length).toEqual(0);
    });
  });

  describe("extensionPoint", () => {
    describe("progressCallback", () => {
      it("calls progressCallback with the progress data passed from child provider", async () => {
        const p1 = provider1();
        const combinedProvider = getCombinedDataProvider([{ provider: p1, prefix: "/generic_topic" }]);
        const extensionPoint = mockExtensionPoint().extensionPoint;
        const mockProgressCallback = jest.spyOn(extensionPoint, "progressCallback");
        await combinedProvider.initialize(extensionPoint);
        p1.extensionPoint.progressCallback({ fullyLoadedFractionRanges: [{ start: 0, end: 0.5 }] });
        const calls = mockProgressCallback.mock.calls;
        expect(calls[calls.length - 1]).toEqual([{ fullyLoadedFractionRanges: [{ start: 0, end: 0.5 }] }]);
      });

      it("intersects progress from multiple child providers", async () => {
        const p1 = provider1();
        const p2 = provider2();
        const combinedProvider = getCombinedDataProvider([
          { provider: p1, prefix: "/generic_topic" },
          { provider: p2 },
        ]);
        const extensionPoint = mockExtensionPoint().extensionPoint;
        const mockProgressCallback = jest.spyOn(extensionPoint, "progressCallback");
        await combinedProvider.initialize(extensionPoint);
        p1.extensionPoint.progressCallback({ fullyLoadedFractionRanges: [{ start: 0.1, end: 0.5 }] });
        let calls = mockProgressCallback.mock.calls;
        // Assume that p2 has no progress yet since it has not reported, so intersected range is empty
        expect(calls[calls.length - 1]).toEqual([{ fullyLoadedFractionRanges: [] }]);
        p2.extensionPoint.progressCallback({ fullyLoadedFractionRanges: [{ start: 0, end: 0.3 }] });
        calls = mockProgressCallback.mock.calls;
        expect(calls[calls.length - 1]).toEqual([{ fullyLoadedFractionRanges: [{ end: 0.3, start: 0.1 }] }]);
      });

      it("assumes providers that don't report progress in initialize are fully loaded", async () => {
        const p1 = provider1(true);
        const p2 = provider2();
        const combinedProvider = getCombinedDataProvider([
          { provider: p1, prefix: "/generic_topic" },
          { provider: p2 },
        ]);
        const extensionPoint = mockExtensionPoint().extensionPoint;
        const mockProgressCallback = jest.spyOn(extensionPoint, "progressCallback");
        await combinedProvider.initialize(extensionPoint);
        p2.extensionPoint.progressCallback({ fullyLoadedFractionRanges: [{ start: 0.1, end: 0.5 }] });
        const calls = mockProgressCallback.mock.calls;
        // Assume that p1 is fully loaded since it did not report during initialize, so intersected range is the one from p2
        expect(calls[calls.length - 1]).toEqual([{ fullyLoadedFractionRanges: [{ start: 0.1, end: 0.5 }] }]);
      });

      it("reflects progress for only the providers which are needed for topics passed to getMessages", async () => {
        const p1 = provider1();
        const p2 = provider2();
        const combinedProvider = getCombinedDataProvider([
          { provider: p1, prefix: "/generic_topic" },
          { provider: p2 },
        ]);
        const extensionPoint = mockExtensionPoint().extensionPoint;
        const mockProgressCallback = jest.spyOn(extensionPoint, "progressCallback");
        await combinedProvider.initialize(extensionPoint);
        p2.extensionPoint.progressCallback({ fullyLoadedFractionRanges: [{ start: 0, end: 0.3 }] });
        let calls = mockProgressCallback.mock.calls;
        // Assume that p1 has no progress yet since it has not reported, so intersected range is empty
        expect(calls[calls.length - 1]).toEqual([{ fullyLoadedFractionRanges: [] }]);
        combinedProvider.getMessages({ sec: 0, nsec: 0 }, { sec: 0.1, nsec: 0 }, ["/some_topic2"]);
        // Reflects progress of only p2, since no topics from p1 are being requested.
        calls = mockProgressCallback.mock.calls;
        expect(calls[calls.length - 1]).toEqual([{ fullyLoadedFractionRanges: [{ start: 0, end: 0.3 }] }]);
      });
    });

    describe("reportMetadataCallback", () => {
      it("calls reportMetadataCallback with the progress data passed from child provider", async () => {
        const p1 = provider1();
        const combinedProvider = getCombinedDataProvider([{ provider: p1, prefix: "/generic_topic" }]);
        const extensionPoint = mockExtensionPoint().extensionPoint;
        const mockReportMetadataCallback = jest.spyOn(extensionPoint, "reportMetadataCallback");
        await combinedProvider.initialize(extensionPoint);
        p1.extensionPoint.reportMetadataCallback({ type: "updateReconnecting", reconnecting: true });
        expect(mockReportMetadataCallback.mock.calls).toEqual([[{ reconnecting: true, type: "updateReconnecting" }]]);
      });
    });
  });
});

describe("mergedBlocks", () => {
  it("can 'merge' two empty blocks", () => {
    expect(mergedBlocks([undefined], [undefined])).toEqual([undefined]);
  });

  it("can 'merge' an empty block with a real one", () => {
    expect(mergedBlocks([undefined], [{ sizeInBytes: 0, messagesByTopic: {} }])).toEqual([
      { sizeInBytes: 0, messagesByTopic: {} },
    ]);
  });

  it("can 'merge' a real block with an empty one", () => {
    expect(mergedBlocks([{ sizeInBytes: 0, messagesByTopic: {} }], [undefined])).toEqual([
      { sizeInBytes: 0, messagesByTopic: {} },
    ]);
  });

  it("can merge two real blocks", () => {
    expect(
      mergedBlocks(
        [{ sizeInBytes: 1, messagesByTopic: { "/foo": [] } }],
        [{ sizeInBytes: 2, messagesByTopic: { "/bar": [] } }]
      )
    ).toEqual([{ sizeInBytes: 3, messagesByTopic: { "/foo": [], "/bar": [] } }]);
  });

  it("works when the first set of blocks is longer", () => {
    expect(
      mergedBlocks(
        [undefined, { sizeInBytes: 1, messagesByTopic: { "/foo": [] } }],
        [{ sizeInBytes: 2, messagesByTopic: { "/bar": [] } }]
      )
    ).toEqual([
      { sizeInBytes: 2, messagesByTopic: { "/bar": [] } },
      { sizeInBytes: 1, messagesByTopic: { "/foo": [] } },
    ]);
  });

  it("works when the second set of blocks is longer", () => {
    expect(
      mergedBlocks(
        [{ sizeInBytes: 1, messagesByTopic: { "/foo": [] } }],
        [undefined, { sizeInBytes: 2, messagesByTopic: { "/bar": [] } }]
      )
    ).toEqual([
      { sizeInBytes: 1, messagesByTopic: { "/foo": [] } },
      { sizeInBytes: 2, messagesByTopic: { "/bar": [] } },
    ]);
  });

  it("memoizes merges", () => {
    const lhs = { sizeInBytes: 1, messagesByTopic: {} };
    const lhsMessagesByTopic = jest.fn().mockReturnValue({ foo: [] });
    // $FlowFixMe: Flow wants a "value", and we can't specify both "value" and "get".
    Object.defineProperty(lhs, "messagesByTopic", { get: lhsMessagesByTopic });

    const rhs = { sizeInBytes: 2, messagesByTopic: {} };
    const rhsMessagesByTopic = jest.fn().mockReturnValue({ bar: [] });
    // $FlowFixMe: Flow wants a "value", and we can't specify both "value" and "get".
    Object.defineProperty(rhs, "messagesByTopic", { get: rhsMessagesByTopic });

    const mergedValue = mergedBlocks([lhs], [rhs]);
    expect(mergedValue).toEqual([{ sizeInBytes: 3, messagesByTopic: { foo: [], bar: [] } }]);
    expect(lhsMessagesByTopic.mock.calls.length).toBe(1);
    expect(rhsMessagesByTopic.mock.calls.length).toBe(1);

    // Value unchanged.
    expect(mergedBlocks([lhs], [rhs])).toEqual(mergedValue);
    // Contents keep identity. $FlowFixMe flow dislikes indexing into "maybe undefined/null".
    expect(mergedBlocks([lhs], [rhs])[0]).toBe(mergedValue[0]);
    // Whole array does not keep identity. Not super important.
    expect(mergedBlocks([lhs], [rhs])).not.toBe(mergedValue);
    // Have not looked at the data aagain, even though we've called mergedBlocks three more times.
    expect(lhsMessagesByTopic.mock.calls.length).toBe(1);
    expect(rhsMessagesByTopic.mock.calls.length).toBe(1);
  });
});
