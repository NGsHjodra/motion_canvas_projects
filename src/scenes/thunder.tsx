import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {Spline} from '@motion-canvas/2d/lib/components';

export default makeScene2D(function* (view) {
    view.fill('#242424');
    // view.add(
    //     <>
    //         <Spline
    //             lineWidth={6}
    //             stroke={'yellow'}
    //             points={[
    //             [-80, -380],
    //             [240, -380],
    //             [50, -100],
    //             [240, -150],
    //             [-220, 400],
    //             [-80, 30],
    //             [-240, 50],
    //             [-80, -380],
    //             ]}
    //             smoothness={0}
    //             // scale={0.5}
    //             // rotation={-90}
    //             // fill={'yellow'}
    //         />
    //     </>,
    // );

    view.add(
        <>
            <Spline
                lineWidth={6}
                stroke={'yellow'}
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
                // scale={0.5}
                // rotation={-90}
                // fill={'yellow'}
            />
        </>,
    );
});