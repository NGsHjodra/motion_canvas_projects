import {makeScene2D} from '@motion-canvas/2d';
import {Rect, Txt} from '@motion-canvas/2d/lib/components';
import {all, waitFor} from '@motion-canvas/core/lib/flow';
import {createRef, makeRef, range, useRandom} from '@motion-canvas/core/lib/utils';
import {DEFAULT, debug} from '@motion-canvas/core';
import {
  CodeBlock,
  lines,
} from '@motion-canvas/2d/lib/components/CodeBlock';
import {createSignal} from '@motion-canvas/core/lib/signals';

export default makeScene2D(function* (view) {
  const code = createRef<CodeBlock>();

  const codeBlock = createRef<Rect>();
  
  const rects: Rect[] = [];
  const txts: Txt[] = [];
  const random = useRandom();
  
  let map: Map<number, number> = new Map();

  view.fill('#141414');

  let randomNumbers = range(7).map(i => random.nextInt(1, 70));
  const signals = [createSignal(randomNumbers[0]), createSignal(randomNumbers[1]), createSignal(randomNumbers[2]), createSignal(randomNumbers[3]), createSignal(randomNumbers[4]), createSignal(randomNumbers[5]), createSignal(randomNumbers[6])];

  for (let i = 0; i < signals.length; i++) {
    map.set(i, i);
  }

  let space_x = 185;

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
    <>
      <Rect
        ref={codeBlock}
        width={1920}
        height={1080/2}
        x={0}
        y={-350}
        offset={-1}
      >
        <CodeBlock
          language='python'
          ref={code}
          fontSize={40}
          offsetX={-1}
          x={-1920 + 350}
          y={+1080/2 - 300}

          fontFamily={'JetBrains Mono'}
          code={() => `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key`}
          />  
      </Rect>
    </>
  );

  yield* code().selection(lines(0), 0.2);
  yield* code().selection(lines(1), 0.2);

  let jump = 175;

  for (let i = 1; i < signals.length; i++) {
    let key = parseInt(txts[map.get(i)].text());
    let j = i - 1;
    yield* all(
      code().selection(lines(2), 0.1),
      rects[map.get(i)].fill('#e6a700', 0.1),
      rects[map.get(i)].y(rects[map.get(i)].y() - jump, 0.2),
      txts[map.get(i)].y(txts[map.get(i)].y() - jump, 0.2),
    );
    yield* code().selection(lines(3), 0.2);
    yield* code().selection(lines(4), 0.2);
    let steps = 0;
    while (j >= 0 && parseInt(txts[map.get(j)].text()) > key) {
      steps++;
      yield* all(
        code().selection(lines(5), 0.1),
        rects[map.get(j)].x(rects[map.get(j)].x() + space_x, 0.2),
        txts[map.get(j)].x(txts[map.get(j)].x() + space_x, 0.2),
      );
      let temp = map.get(j + 1);
      map.set(j + 1, map.get(j));
      map.set(j, temp);
      j -= 1;
      yield* code().selection(lines(6), 0.2);
      yield* code().selection(lines(4), 0.2);
    }
    yield* code().selection(lines(7), 0.2);
    yield* all(
      rects[map.get(j + 1)].x(rects[map.get(j + 1)].x() - steps * space_x, 0.2),
      txts[map.get(j + 1)].x(txts[map.get(j + 1)].x() - steps * space_x, 0.2),
    )
    yield* all(
      rects[map.get(j + 1)].fill('#e3242b', 0.2),
      rects[map.get(j + 1)].y(rects[map.get(j + 1)].y() + jump, 0.2),
      txts[map.get(j + 1)].y(txts[map.get(j + 1)].y() + jump, 0.2),
    );
    yield* code().selection(lines(1), 0.2);
  }

  yield* code().selection(DEFAULT, 0.2);
  for (let i = 0; i < signals.length; i++) {
    yield* rects[map.get(i)].fill('#2be324', 0.15);
  }
});