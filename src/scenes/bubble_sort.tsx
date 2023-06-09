import {makeScene2D} from '@motion-canvas/2d';
import {Rect, Txt} from '@motion-canvas/2d/lib/components';
import {all, waitFor} from '@motion-canvas/core/lib/flow';
import {createRef, makeRef, range, useRandom} from '@motion-canvas/core/lib/utils';
import {DEFAULT} from '@motion-canvas/core';
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

  view.add(
    range(signals.length).map(i => (
      <Rect
        ref={makeRef(rects, i)}
        width={150}
        height={150}
        x={-185 * (signals.length - 1) / 2 + 185 * i}
        fill="#e3242b"
        radius={10}
        y={-275}
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
        y={-275}
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
          code={() => `def bubbleSort(arr, n):
    for i in range(n):
        swapped = False
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1] :
                arr[j], arr[j+1] = arr[j+1], arr[j]
                swapped = True
        if swapped == False:
            break
    return arr`}
          />  
      </Rect>
    </>
  );

  yield* waitFor(0.5);
  yield* code().selection(lines(0), 0.2);

  let jump = 90;

  let swapped = false;
  for (let i = 0; i < signals.length - 1; i++) {
    swapped = false;
    
    yield* code().selection(lines(1), 0.2);
    yield* code().selection(lines(2), 0.2);
    
    for (let j = 0; j < signals.length - i - 1; j++) {
      
      yield* code().selection(lines(3), 0.2);
      yield* all(
        code().selection(lines(4), 0.2),
        rects[map.get(j)].fill('#e6a700', 0.2),
        rects[map.get(j+1)].fill('#e6a700', 0.2),
      );
      if (txts[map.get(j)].text() > txts[map.get(j+1)].text()) {
        swapped = true;
        let temp2 = map.get(j);
        map.set(j, map.get(j+1));
        map.set(j+1, temp2);
        yield* all(
          rects[map.get(j)].y(rects[map.get(j)].y() + jump, 0.1),
          rects[map.get(j+1)].y(rects[map.get(j+1)].y() - jump, 0.1),
          txts[map.get(j)].y(txts[map.get(j)].y() + jump, 0.1),
          txts[map.get(j+1)].y(txts[map.get(j+1)].y() - jump, 0.1),
        )
        yield* all(
          code().selection(lines(5,6), 0.1),
          rects[map.get(j)].x(rects[map.get(j)].x() - 185, 0.2),
          rects[map.get(j+1)].x(rects[map.get(j+1)].x() + 185, 0.2),
          txts[map.get(j)].x(txts[map.get(j)].x() - 185, 0.2),
          txts[map.get(j+1)].x(txts[map.get(j+1)].x() + 185, 0.2),
        );
        yield* all(
          rects[map.get(j)].y(rects[map.get(j)].y() - jump, 0.1),
          rects[map.get(j+1)].y(rects[map.get(j+1)].y() + jump, 0.1),
          txts[map.get(j)].y(txts[map.get(j)].y() - jump, 0.1),
          txts[map.get(j+1)].y(txts[map.get(j+1)].y() + jump, 0.1),
        )
      }
      
      if (j == signals.length - i - 2) {
        yield* all(
          rects[map.get(j)].fill('#e3242b', 0.2),
          rects[map.get(j+1)].fill('#2832c2', 0.2),
        );
        break;
      }
      
      yield* all(
        rects[map.get(j)].fill('#e3242b', 0.2),
        rects[map.get(j+1)].fill('#e3242b', 0.2),
      );
    }
    yield* code().selection(lines(7), 0.2);
    if (!swapped) {
      yield* code().selection(lines(8), 0.2);
      yield* code().selection(lines(9), 0.2);
      yield* code().selection(DEFAULT, 0.2);
      for (let i = 0; i < signals.length; i++) {
        yield* rects[map.get(i)].fill('#2be324', 0.15);
      }
      break;
    }
  }
});