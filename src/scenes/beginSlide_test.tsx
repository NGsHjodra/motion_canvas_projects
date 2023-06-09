import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {Txt} from '@motion-canvas/2d/lib/components';
import {beginSlide, createRef} from '@motion-canvas/core/lib/utils';
import {waitFor} from '@motion-canvas/core/lib/flow';

export default makeScene2D(function* (view) {
  const title = createRef<Txt>();
  view.add(<Txt ref={title} />);

  title().text('FIRST SLIDE');
  yield* beginSlide('first slide');
  yield* waitFor(1); // try doing some actual animations here
  

  title().text('SECOND SLIDE');
  yield* beginSlide('second slide');
  yield* waitFor(1);

  title().text('LAST SLIDE');
  yield* beginSlide('last slide');
  yield* waitFor(1);
});