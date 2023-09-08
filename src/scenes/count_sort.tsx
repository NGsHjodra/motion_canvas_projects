import {makeScene2D} from '@motion-canvas/2d';
import {Rect, Txt} from '@motion-canvas/2d/lib/components';
import {all, waitFor} from '@motion-canvas/core/lib/flow';
import {createRef, makeRef, range, useRandom} from '@motion-canvas/core';
import {DEFAULT, debug} from '@motion-canvas/core';
import {
  CodeBlock,
  lines,
} from '@motion-canvas/2d/lib/components/CodeBlock';
import {createSignal} from '@motion-canvas/core/lib/signals';

export default makeScene2D(function* (view) {
  const code = createRef<CodeBlock>();
  
  const rects: Rect[] = [];
  const txts: Txt[] = [];

  const output_rects: Rect[] = [];
  const output_txts: Txt[] = [];
  const output_sub_txt = createRef<Txt>();

  const count_rects: Rect[] = [];
  const count_txts: Txt[] = [];
  const count_sub_txt = createRef<Txt>();

  const random = useRandom();
  
  let map: Map<number, number> = new Map();

  view.fill('#141414');

  let randomNumbers = range(7).map(i => random.nextInt(0, 10));
  const signals = [createSignal(randomNumbers[0]), createSignal(randomNumbers[1]), createSignal(randomNumbers[2]), createSignal(randomNumbers[3]), createSignal(randomNumbers[4]), createSignal(randomNumbers[5]), createSignal(randomNumbers[6])];

  for (let i = 0; i < signals.length; i++) {
    map.set(i, i);
  }

  let space_x = 185;

  yield view.add(
    <Txt
      fontSize={75}
      fontFamily={'JetBrains Mono'}
      text={'Array'}
      y={-370}
      fill={'#f0f0f0'}
    />
  )

  view.add(
    range(signals.length).map(i => (
      <Rect
        ref={makeRef(rects, i)}
        width={150}
        height={150}
        x={-space_x * (signals.length - 1) / 2 + space_x * i}
        fill="#e3242b"
        radius={10}
        y={-225}
      />
    ))
  );

  yield view.add(
    range(signals.length).map(i => (
      <Txt
        ref={makeRef(txts, i)}
        fontSize={75}
        fontFamily={'JetBrains Mono'}
        text={signals[i]().toString()}
        x={rects[i].x()}
        y={-225}
        fill={'#f0f0f0'}
      />
    ))
  );

  yield view.add(
    <Txt
      ref={output_sub_txt}
      fontSize={40}
      fontFamily={'JetBrains Mono'}
      text={'Output'}
      x={460}
      y={-20}
      fill={'#f0f0f0'}
      opacity={0}
    />
  );

  yield view.add(
    range(signals.length).map(i => (
      <Rect
        ref={makeRef(output_rects, i)}
        width={80}
        height={80}
        x={160 + 100 * i}
        y={60}
        fill="#e3242b"
        radius={10}
        opacity={0}
      />
    ))
  );

  yield view.add(
    range(signals.length).map(i => (
      <Txt
        ref={makeRef(output_txts, i)}
        fontSize={40}
        fontFamily={'JetBrains Mono'}
        text={'0'}
        x={output_rects[i].x()}
        y={60}
        fill={'#f0f0f0'}
        opacity={0}
      />
    ))
  );

  yield view.add(
    <Txt
      ref={count_sub_txt}
      fontSize={40}
      fontFamily={'JetBrains Mono'}
      text={'Count'}
      x={460}
      y={180}
      fill={'#f0f0f0'}
      opacity={0}
    />
  );

  yield view.add(
    range(10).map(i => (
      <Rect
        ref={makeRef(count_rects, i)}
        width={80}
        height={80}
        x={260 + 100 * (i%5)}
        y={260 + 100 * Math.floor(i/5)}
        fill="#e3242b"
        radius={10}
        opacity={0}
      />
    ))
  );

  yield view.add(
    range(10).map(i => (
      <Txt
        ref={makeRef(count_txts, i)}
        fontSize={40}
        fontFamily={'JetBrains Mono'}
        text={'0'}
        x={count_rects[i].x()}
        y={count_rects[i].y()}
        fill={'#f0f0f0'}
        opacity={0}
      />
    ))
  );


  yield view.add(
    <>
      <CodeBlock
        language='python'
        ref={code}
        fontSize={30}
        offsetX={-1}
        alignItems={'center'}
        x={-738/2}
        y={180}

        fontFamily={'JetBrains Mono'}
        code={() => `def counting_sort(arr):
    output = [0 for _ in range(len(arr))]
    count = [0 for _ in range(10)]
    for i in arr:
        count[i] += 1
    for i in range(1, 10):
        count[i] += count[i-1]
    for i in range(len(arr) - 1, -1, -1):
        output[count[arr[i]]-1] = arr[i]
        count[arr[i]] -= 1
    for i in range(0, len(arr)):
        arr[i] = output[i]`}
      /> 
    </>
  );

  yield* code().selection(lines(0), 0.5);
  yield* code().selection(lines(1), 0.5);
  yield* code().x(-760, 0.5);
  
  yield* all(
    output_sub_txt().opacity(1, 0.5),
    ...range(signals.length).map(i => (
      output_rects[i].opacity(0.5, 0.5)
    )),
    ...range(signals.length).map(i => (
      output_txts[i].opacity(1, 0.5)
    )),
  )

  yield* code().selection(lines(2), 0.5);

  yield* all(
    count_sub_txt().opacity(1, 0.5),
    ...range(10).map(i => (
      count_rects[i].opacity(0.5, 0.5)
    )),
    ...range(10).map(i => (
      count_txts[i].opacity(1, 0.5)
    )),
  );

  yield* waitFor(0.5);

  for (let i = 0; i < signals.length; i++) {
    // debug("Count Txt " + i.toString() + " " + count_txts[signals[i]()].text())
    yield* code().selection(lines(3), 0.5),
    yield* all(
      code().selection(lines(4), 0.5),
      rects[i].fill('#e6a700', 0.5),
      count_txts[signals[i]()].text((parseInt(count_txts[signals[i]()].text()) + 1).toString(), 0.5),
      count_rects[signals[i]()].fill('#e6a700', 0.5),
    )
    yield* all(
      rects[i].fill('#e3242b', 0.5),
      count_rects[signals[i]()].fill('#e3242b', 0.5),
    )
  }

  yield* waitFor(0.5);

  for (let i = 1; i < 10; i++) {
    yield* code().selection(lines(5), 0.5),
    // debug("Count Txt " + i.toString() + " " + count_txts[i].text())
    yield* all(
      code().selection(lines(6), 0.5),
      count_txts[i].text((parseInt(count_txts[i].text()) + parseInt(count_txts[i-1].text())).toString(), 0.5),
      count_rects[i].fill('#e6a700', 0.5),
    )
    yield* all(
      count_rects[i].fill('#e3242b', 0.5),
    )
  }

  yield* waitFor(0.5);

  for (let i = signals.length - 1; i > -1; i--) {
    yield* code().selection(lines(7), 0.5),
    yield* all(
      code().selection(lines(8), 0.5),
      output_txts[parseInt(count_txts[signals[i]()].text()) - 1].text(signals[i]().toString(), 0.5),
      output_rects[parseInt(count_txts[signals[i]()].text()) - 1].fill('#2832c2', 0.5),
    )
    yield* all(
      code().selection(lines(9), 0.5),
      count_txts[signals[i]()].text((parseInt(count_txts[signals[i]()].text()) - 1).toString(), 0.5),
      count_rects[signals[i]()].fill('#e6a700', 0.5),
    )
  }

  yield* waitFor(0.5);

  for (let i = 0; i < signals.length; i++) {
    yield* code().selection(lines(10), 0.5),
    yield* all(
      code().selection(lines(11), 0.5),
      rects[i].fill('#2be324', 0.5),
      output_rects[i].fill('#2be324', 0.5),
      txts[i].text(output_txts[i].text(), 0.5),
    )
  }

  yield* waitFor(0.5);

  yield* code().selection(DEFAULT, 0.5);
});