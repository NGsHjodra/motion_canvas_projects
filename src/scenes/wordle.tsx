import {makeScene2D} from '@motion-canvas/2d';
import {Layout, Rect, Txt} from '@motion-canvas/2d';
import {makeRef, range, useRandom, createSignal} from '@motion-canvas/core';
import {all, loop, sequence, waitFor, debug} from '@motion-canvas/core';

export default makeScene2D(function* (view) {
  const rects: Rect[] = [];
  const txts_side: Txt[] = [];
  const txts: Txt[] = [];
  const txts_alphabet: Txt[] = [];

  view.fill('#242424');

  let hidden_word = "WHIRL";

  let keystrokes = ["C", "R", "A", "N", "E", "Enter",
                    "P", "I", "V", "O", "T", "Enter",
                    "F", "L", "A", "I", "R", "Enter",
                    "U", "N", "I", "T", 
                    "E", "Backspace", 
                    "Y", "Enter",
                    "G", "R", "I", "L", "L", "Enter",
                    "W", "H", "I", "R", "L", "Enter",];

  yield view.add(
    range(keystrokes.length).map(i => (     
      <Txt
        ref={makeRef(txts_side, i)}
        opacity={0}
        x={600}
        y={300}
        fill={'#ffffff'}
        fontSize={50}
        stroke={'#242424'}
        offset={-1}
        text={keystrokes[i]}
        alignItems={'center'}
        alignContent={'center'}
        fontFamily={'Comic Sans MS'}
      />  
    ))
  );

  const gap = 150;
  const size = 125;

  // manual outline
  yield view.add(
    range(30).map(i => (
      <Rect
        x={-(4 / 2) * gap + i % 5  * gap}
        y={-(5 / 2) * gap + Math.floor(i / 5)  * gap}
        radius={10}
        width={size + 5}
        height={size + 5}
        fill='#ffffff'
      />
    ))
  )

  yield view.add(
    range(30).map(i => (
      <Rect
        ref={makeRef(rects, i)}
        x={-(4 / 2) * gap + i % 5  * gap}
        y={-(5 / 2) * gap + Math.floor(i / 5)  * gap}
        radius={10}
        width={size}
        height={size}
        fill='#242424'
      />
    ))
  )

  yield view.add(
    range(30).map(i => (
      <Txt
        ref={makeRef(txts, i)}
        x={-(4 / 2) * gap + i % 5  * gap}
        y={-(5 / 2) * gap + Math.floor(i / 5)  * gap}
        fontSize={75}
        fontFamily={'JetBrains Mono'}
        fill={'#f0f0f0'}
        alignItems={'center'}
        alignContent={'center'}
      />
    ))
  )

  // side text
  
  let alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let alp_gap = 60;

  yield view.add(
    range(26).map(i => (
      <Txt
        ref={makeRef(txts_alphabet, i)}
        x={-730 + Math.floor(i / 13) * alp_gap}
        y={-(12 / 2 * alp_gap) + i % 13 * alp_gap}
        fontSize={45}
        fontFamily={'Comic Sans MS'}
        fill={'#ffffff'}
        text={alphabets[i]}
        alignItems={'center'}
        alignContent={'center'}
      />
    ))
  )

  let other = 0;
  let walk = 0;
  const short_w = 0.25;

  for (let stroke of keystrokes) {
    if (stroke === "Enter") {
      if (hidden_word.includes(txts[walk - 5 - other].text())) {
        // debug(`stroke = ${txts[walk - 5 - other].text()} hidden_word[0] = ${hidden_word[0]} other = ${other} walk = ${walk}`)
        if (txts[walk - 5 - other].text() === hidden_word[0]) {
          yield* all(
            rects[walk - 5 - other].fill('#20b2a0', short_w),
            txts_side[walk].opacity(1, short_w),
          )
        } else {
          yield* all(
            rects[walk - 5 - other].fill('#FFBF00', short_w),
            txts_side[walk].opacity(1, short_w),
          )
        }
      } else {
        yield* all(
          rects[walk - 5 - other].fill('#244444', short_w),
          txts_side[walk].opacity(1, short_w),
        )
      }
      if (hidden_word.includes(txts[walk - 5 + 1 - other].text())) {
        if (txts[walk - 5 + 1 - other].text() === hidden_word[1]) {
          yield* all(
            rects[walk - 5 + 1 - other].fill('#20b2a0', short_w),
            txts_side[walk].opacity(0, short_w),
            txts_side[walk].y(-100, short_w),
          )
        } else {
          yield* all(
            rects[walk - 5 + 1 - other].fill('#FFBF00', short_w),
            txts_side[walk].opacity(0, short_w),
            txts_side[walk].y(-100, short_w),
          )
        }
      } else {
        yield* all(
          rects[walk - 5 + 1 - other].fill('#244444', 1),
          txts_side[walk].opacity(0, short_w),
          txts_side[walk].y(-100, short_w),
        )
      }
      for (let i = 2; i < 5; i++) {
        if (hidden_word.includes(txts[walk - 5 + i - other].text())) {
          if (txts[walk - 5 + i - other].text() === hidden_word[i]) {
            yield* all(
              rects[walk - 5 + i - other].fill('#20b2a0', short_w),
            )
          } else {
            yield* all(
              rects[walk - 5 + i - other].fill('#FFBF00', short_w),
              
            )
          }
        } else {
          yield* all(
            rects[walk - 5 + i - other].fill('#244444', short_w),
          )
        }
      }
      walk++;
      other++;
      continue;
    }
    if (stroke == "Backspace") {
      yield* all(
        txts[walk - 1 - other].text('', short_w),
        txts_side[walk].opacity(1, short_w),
      )
      yield* all(
        txts_side[walk].opacity(0, short_w),
        txts_side[walk].y(-100, short_w),
      )
      walk++;
      other = other + 2;
      continue;
    }
    yield* all(
      txts_side[walk].opacity(1, short_w),
      txts[walk - other].text(stroke, short_w),
    )
    yield* all(
      txts_side[walk].opacity(0, short_w),
      txts_side[walk].y(-100, short_w),
    )
    walk++;
  }
});