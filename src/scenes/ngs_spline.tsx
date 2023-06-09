import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {Spline, Rect} from '@motion-canvas/2d/lib/components';
import {createSignal} from "@motion-canvas/core/lib/signals";
import {createRef, useRandom} from '@motion-canvas/core/lib/utils';
import {all} from '@motion-canvas/core/lib/flow';

export default makeScene2D(function* (view) {
    const random = useRandom();
    const spline = createRef<Spline>();
    const spline_g = createRef<Spline>();
    const spline_s = createRef<Spline>();
    const progress = createSignal(0);
    const progress_g = createSignal(0);
    const progress_s = createSignal(0);
  
    view.fill('#242424');

    view.add(
        <>
            <Spline
                ref={spline}
                lineWidth={6}
                stroke={'lightgray'}
                points={[
                [-500, 100],
                [-500, -100],
                [-300, -100],
                [-300, 100],
                ]}
                end={0}
            />
            <Rect
                size={26}
                fill={'lightseagreen'}
                position={() => 
                    spline().getPointAtPercentage(progress()).position}
                rotation={() =>
                    spline().getPointAtPercentage(progress()).tangent.degrees
                }
            />,
        </>,
    );
        
    yield* all(spline().end(1, 1.5), progress(1, 1.5));

    yield* spline().smoothness(0, 1);

    view.add(
        <>
            <Spline
                ref={spline_g}
                lineWidth={6}
                stroke={'lightgray'}
                points={[
                [100, -100],
                [-100, -100],
                [-100, 100],
                [100, 100],
                [100, 25],
                [0, 25],
                ]}
                end={0}
            />
            <Rect
            size={26}
                fill={'magenta'}
                position={() => 
                    spline_g().getPointAtPercentage(progress_g()).position}
                rotation={() =>
                    spline_g().getPointAtPercentage(progress_g()).tangent.degrees
                }
            />,
        </>,
    );

    yield* all(spline_g().end(1, 1.5), progress_g(1, 1.5));

    yield* spline_g().smoothness(0, 1);

    view.add(
        <>
            <Spline
                ref={spline_s}
                lineWidth={6}
                stroke={'lightgray'}
                points={[
                [500, -100],
                [300, -100],
                [300, 0],
                [500, 0],
                [500, 100],
                [300, 100],
                ]}
                end={0}
            />
            <Rect
                size={26}
                fill={'crimson'}
                position={() =>
                    spline_s().getPointAtPercentage(progress_s()).position}
                rotation={() =>
                    spline_s().getPointAtPercentage(progress_s()).tangent.degrees
                }
            />,
        </>,
    );

    yield* all(spline_s().end(1, 1.5), progress_s(1, 1.5));

    yield* spline_s().smoothness(0, 1);

    yield* all(
        spline().lineWidth(13, 1),
        spline().stroke('lightseagreen', 1),
        spline_g().lineWidth(13, 1),
        spline_g().stroke('magenta', 1),
        spline_s().lineWidth(13, 1),
        spline_s().stroke('crimson', 1),
    );

  });