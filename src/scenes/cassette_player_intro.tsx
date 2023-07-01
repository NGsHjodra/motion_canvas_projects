import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {Circle, Img, Rect, Spline, Txt} from '@motion-canvas/2d';
import {createRef, makeRef, range} from '@motion-canvas/core/lib/utils';
import {all, loop, sequence, waitFor} from '@motion-canvas/core/lib/flow';
import { createSignal } from '@motion-canvas/core';

export default makeScene2D(function* (view) {
  const txt = createRef<Txt>();

  const bg_black = "#040404"
  const white = "#f0f0f0"
  const blue = "#1e90f0"
  const dark_blue = "#0e60b0"
  const light_blue = "#3eb0f0"

  view.fill(bg_black);

  // add buttons

  view.add(<Rect
    y={-300}
    x={-600}
    width={200}
    height={120}
    radius={10}
    fill={blue}
  />);

  view.add(<Rect
    y={-310}
    x={-600}
    width={200 - 20}
    height={120 - 20 - 20}
    radius={10}
    fill={bg_black}
  />);

  view.add(<Rect
    y={-300}
    x={-300}
    width={200}
    height={120}
    radius={10}
    fill={blue}
  />);

  view.add(<Rect
    y={-310}
    x={-300}
    width={200 - 20}
    height={120 - 20 - 20}
    radius={10}
    fill={bg_black}
  />);

  view.add(<Rect
    y={-300}
    x={600}
    width={200}
    height={120}
    radius={10}
    fill={blue}
  />);

  view.add(<Rect
    y={-310}
    x={600}
    width={200 - 20}
    height={120 - 20 - 20}
    radius={10}
    fill={bg_black}
  />);

  view.add(<Rect
    y={-300}
    x={380}
    width={100}
    height={80}
    radius={10}
    fill={blue}
  />);

  view.add(<Rect
    y={-305}
    x={380}
    width={100 - 20}
    height={80 - 20 - 10}
    radius={10}
    fill={bg_black}
  />);

  view.add(<Rect
    y={-300}
    x={210}
    width={100}
    height={80}
    radius={10}
    fill={blue}
  />);

  view.add(<Rect
    y={-305}
    x={210}
    width={100 - 20}
    height={80 - 20 - 10}
    radius={10}
    fill={bg_black}
  />);

  view.add(<Rect
    y={-300}
    x={40}
    width={100}
    height={80}
    radius={10}
    fill={blue}
  />);

  view.add(<Rect
    y={-305}
    x={40}
    width={100 - 20}
    height={80 - 20 - 10}
    radius={10}
    fill={bg_black}
  />);

  // add body

  view.add(<Rect
    x={0}
    y={100}
    width={1700}
    height={750}
    radius={10}
    fill={blue}
  />);

  view.add(<Rect
    x={0}
    y={100}
    width={1680}
    height={730}
    radius={10}
    fill={bg_black}
  />);

  view.add(<Rect
    x={0}
    y={-120}
    width={1680}
    height={300}
    radius={10}
    fill={light_blue}
    opacity={0.5}
  />);

  // add cassette

  const cassette_width = 600  
  const cassette_height = 400

  view.add(<Rect
    x={0}
    y={200}
    width={cassette_width}
    height={cassette_height}
    radius={10}
    fill={blue}
  />);

  view.add(<Rect
    x={0}
    y={200}
    width={cassette_width - 20}
    height={cassette_height - 20}
    radius={10}
    fill={bg_black}
  />);

  view.add(<Rect
    x={0}
    y={110}
    width={cassette_width - 20}
    height={220}
    fill={dark_blue}
    opacity={0.5}
  />);

  // add cassette tab

  const cassette_tab_width = 400
  const cassette_tab_height = 100

  view.add(<Rect
    x={0}
    y={160 - cassette_tab_height / 2}
    width={cassette_tab_width}
    height={cassette_tab_height}
    radius={cassette_tab_width / 2}
    fill={blue}
  />);

  view.add(<Circle
    x={cassette_tab_width / 2 - cassette_tab_height / 2}
    y={160 - cassette_tab_height / 2}
    size={cassette_tab_height - 20}
    fill={white}
  />);

  view.add(<Circle
    x={cassette_tab_width / 2 - cassette_tab_height / 2}
    y={160 - cassette_tab_height / 2}
    size={cassette_tab_height - 30}
    fill={bg_black}
  />);

  view.add(<Circle
    x={-cassette_tab_width / 2 + cassette_tab_height / 2}
    y={160 - cassette_tab_height / 2}
    size={cassette_tab_height - 20}
    fill={white}
  />);

  view.add(<Circle
    x={-cassette_tab_width / 2 + cassette_tab_height / 2}
    y={160 - cassette_tab_height / 2}
    size={cassette_tab_height - 30}
    fill={bg_black}
  />);

  view.add(<Rect
    x={0}
    y={160 - cassette_tab_height / 2}
    width={cassette_tab_width - cassette_tab_height * 2 + 10 }
    height={cassette_tab_height - 20}
    fill={bg_black}
  />);

  // add cassette's album

  view.add(<Txt
    x={0}
    y={300}
    text={"NGs"}
    fontSize={50}
    fontFamily={'Comic Sans MS'}
    fill={white}
  />);

  const speaker_size = 500
  const speaker_x = 570 //340 + 230
  const speaker_y = 200

  // add speaker

  view.add(<Circle
    x={speaker_x}
    y={speaker_y}
    size={speaker_size}
    fill={blue}
  />);

  view.add(<Circle
    x={speaker_x}
    y={speaker_y}
    size={speaker_size - 40}
    fill={bg_black}
  />);

  view.add(<Circle
    x={-speaker_x}
    y={speaker_y}
    size={speaker_size}
    fill={blue}
  />);

  view.add(<Circle
    x={-speaker_x}
    y={speaker_y}
    size={speaker_size - 40}
    fill={bg_black}
  />);

  const speaker_moving_size = createSignal(speaker_size / 2)

  // add speaker's mesh

  view.add(<Circle
    x={speaker_x}
    y={speaker_y}
    size={() => speaker_moving_size()}
    fill={white}
  />);

  view.add(<Circle
    x={speaker_x}
    y={speaker_y}
    size={speaker_size / 2 - 25}
    fill={bg_black}
  />);

  view.add(<Circle
    x={speaker_x}
    y={speaker_y}
    size={speaker_size / 2 - 75}
    fill={blue}
  />);

  view.add(<Circle
    x={speaker_x}
    y={speaker_y}
    size={70}
    fill={bg_black}
  />);

  view.add(<Circle
    x={-speaker_x}
    y={speaker_y}
    size={() => speaker_moving_size()}
    fill={white}
  />);

  view.add(<Circle
    x={-speaker_x}
    y={speaker_y}
    size={speaker_size / 2 - 25}
    fill={bg_black}
  />);

  view.add(<Circle
    x={-speaker_x}
    y={speaker_y}
    size={speaker_size / 2 - 75}
    fill={blue}
  />);

  view.add(<Circle
    x={-speaker_x}
    y={speaker_y}
    size={70}
    fill={bg_black}
  />);

  // add status bar (top)

  const statusbar_y = -150

  view.add(<Rect
    x={0}
    y={statusbar_y}
    width={1000}
    height={180}
    radius={10}
    fill={blue}
  />);
    
  view.add(<Rect
    x={0}
    y={statusbar_y}
    width={980}
    height={160}
    radius={10}
    fill={bg_black}
  />);
  
  const thunder_distance_signal = createSignal(speaker_size / 2 + 75)

  const rotation = createSignal(180);
  
  // I don't know yet why it spin 5.75 times but using this work

  const thunder_opa = createSignal(0)

  // add thunder

  view.add(
    range(4).map((i) => (
        <Spline
            lineWidth={6}
            stroke={'yellow'}
            fill={'yellow'}
            points={[
              [20, -400],
              [-80, -70],
              [120, -120],
              [-220, 400],
              [-80, 30],
              [-260, 70],
              [20, -400],
            ]}
            smoothness={0}
            scale={0.2}
            rotation={() => (rotation() + 90 * i)}
            x={() => -Math.sin((rotation() + 90 * i) / 57.5) * thunder_distance_signal() + speaker_x}
            y={() => +Math.cos((rotation() + 90 * i) / 57.5) * thunder_distance_signal() + speaker_y}
            opacity={() => thunder_opa()}
        />
    )),
  );

  view.add(
    range(4).map((i) => (
        <Spline
            lineWidth={6}
            stroke={'yellow'}
            fill={'yellow'}
            points={[
              [20, -400],
              [-80, -70],
              [120, -120],
              [-220, 400],
              [-80, 30],
              [-260, 70],
              [20, -400],
            ]}
            smoothness={0}
            scale={0.2}
            rotation={() => (rotation() + 90 * i)}
            x={() => -Math.sin((rotation() + 90 * i) / 57.5) * thunder_distance_signal() - speaker_x}
            y={() => +Math.cos((rotation() + 90 * i) / 57.5) * thunder_distance_signal() + speaker_y}
            opacity={() => thunder_opa()}
        />
    )),
  );

  // add status bar's text

  view.add(<Txt
    ref={txt}
    x={0}
    y={statusbar_y}
    text={"..."}
    fontSize={50}
    fontFamily={'JetBrains Mono'}
    fill={white}
  />);

  // animation
  
  yield* txt().text("", 0.5)
  yield* txt().text("Loading", 1)
  yield* txt().text("Loading...", 0.5)
  yield* txt().text("", 0.5)

  yield* all(
    sequence(
      0.5,
      txt().text("Starting", 0.5),
      txt().text("Starting...", 0.5),
      txt().text("Starting", 0.5),
      sequence(
        0.3,
        txt().text("", 0.5),
        all(
          thunder_opa(1, 0.2),
          speaker_moving_size(speaker_size / 2 + 50, 0.2),
        ),
      ),

      all(
        txt().text("Go!!!", 0.2),
        thunder_opa(0, 1),
        thunder_distance_signal(speaker_size - 100, 1),
        rotation(180 + 45, 1),
        loop(
          5,
          _ => speaker_moving_size(speaker_size / 2 + 75 + 40, 0.15).to(speaker_size / 2 + 75, 0.05),
        ),
      ),
    ),
    loop(
      4,
      _ => speaker_moving_size(speaker_size / 2 + 75, 0.25).to(speaker_size / 2, 0.15),
    ),
  )
  yield* speaker_moving_size(speaker_size / 2, 0.5)
});