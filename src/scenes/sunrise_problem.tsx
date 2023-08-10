import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {Spline, Rect, Txt, Img, Layout, Latex, Line} from '@motion-canvas/2d';
import {
    CodeBlock,
    edit,
    insert,
    lines,
    remove,
  } from '@motion-canvas/2d/lib/components/CodeBlock';
import {createSignal} from "@motion-canvas/core/lib/signals";
import {createRef, makeRef, useRandom} from '@motion-canvas/core/lib/utils';
import {all, sequence, waitFor} from '@motion-canvas/core/lib/flow';
import laplace from '../../images/sunrise_problem/laplace.jpg'

export default makeScene2D(function* (view) {
    
    const white = '#E0E0E0';
    const black = '#040404';
    const crimson = '#D72638';

    view.fill(black);

    const txt_1 = createRef<Txt>();
    const txt_2 = createRef<Txt>();
    const meme_sun = createRef<Txt>(); // decide to not use

    // naration
    yield view.add(
        <>
            <Txt
                x={0}
                y={0}
                ref={txt_1}
                fill={white}
                text={'For short'}
                textAlign={'center'}
                fontFamily={'Monospace'}
                fontSize={120}
            />,
            <Txt
                x={2000}
                y={0}
                ref={meme_sun}
                fill={crimson}
                text={'🌞'}
                textAlign={'center'}
                fontFamily={'Monospace'}
                fontSize={160}
            />,
        </>
    );

    // animation 
    yield* waitFor(0.5);
    // yield* all(
    //     meme_sun().x(0, 1),
    //     meme_sun().y(-400, 1),
    // )
    // yield* all(
    //     meme_sun().x(-2000, 1),
    //     meme_sun().y(0, 1),
    //     txt_1().opacity(0, 1),
    // )
    // yield txt_1().text('For short');
    yield* txt_1().opacity(1, 0.5);
    yield* txt_1().text('For short\nIt\'s 99.9999 %', 0.5);
    yield* waitFor(0.5);
    yield* txt_1().opacity(0, 0.5);
    yield* waitFor(1);
    yield txt_1().fontSize(80);
    yield txt_1().text('But, For long...');
    yield* txt_1().opacity(1, 0.5);
    yield* waitFor(0.5);
    yield* txt_1().text('', 0.5);
    yield* txt_1().text('This kind of problem is called\n', 1);
    yield* waitFor(0.5);
    yield* txt_1().text('This kind of problem is called\nSunrise problem', 1);

    const red_line = createRef<Spline>();
    view.add(
        <Spline
            ref={red_line}
            lineWidth={10}
            stroke={crimson}
            points={[
                [-330, 96],
                [330, 96],
            ]}
            smoothness={0}
            end={0}
        />
    )

    yield* red_line().end(1, 1);
    yield* waitFor(0.5);
    yield red_line().end(0);
    yield txt_1().opacity(0);

    const laplace_opa = createSignal(0);
    const layout_txt : Txt[] = [];

    yield view.add(
        <>
            <Layout direction={'row'} gap={40} alignItems={'center'} width={1600} layout>
                <Layout direction={'column'} gap={20} layout>
                    <Img
                        src={laplace}
                        scale={1}
                        opacity={laplace_opa}
                    />,
                    <Txt
                        text={'Pierre-Simon Laplace'}
                        fill={white}
                        textAlign={'center'}
                        fontFamily={'Monospace'}
                        fontSize={40}
                        opacity={laplace_opa}
                    />,
                </Layout>,
                <Layout direction={'column'} gap={10} layout>
                    <Txt
                        text={''}
                        ref={makeRef(layout_txt, 0)}
                        fill={white}
                        textAlign={'center'}
                        fontFamily={'Monospace'}
                        fontSize={50}
                    />,
                    <Txt
                        text={''}
                        ref={makeRef(layout_txt, 1)}
                        fill={white}
                        textAlign={'center'}
                        fontFamily={'Monospace'}
                        fontSize={50}
                    />,
                    <Txt
                        text={''}
                        ref={makeRef(layout_txt, 2)}
                        fill={white}
                        textAlign={'center'}
                        fontFamily={'Monospace'}
                        fontSize={50}
                    />,
                </Layout>
            </Layout>,
            <Spline
                ref={red_line}
                stroke={crimson}
                lineWidth={5}
                end={0}
                points={[
                    [90, 130],
                    [600, 130]
                ]}
            />
        </>
    )
    yield* layout_txt[0].text('First introduced in the 18th century', 1);
    yield* waitFor(0.5);
    yield* all(
        layout_txt[1].text('by Pierre-Simon Laplace', 1),
        laplace_opa(1, 1),
    )
    yield* waitFor(0.5);
    yield* layout_txt[2].text('his approach to this problem is\n his rule of succession', 1.5);
    yield* waitFor(0.5);
    yield* red_line().end(1, 1);
    yield* waitFor(0.5);
    yield* all(
        ...layout_txt.map(txt => txt.opacity(0, 0.5)),
        laplace_opa(0, 0.5),
        red_line().end(0, 0.5),
    )
    yield* waitFor(0.5);
    yield txt_1().text('')
    yield view.add(
        <>
            <Txt
                x={0}
                y={0}
                ref={txt_2}
                fill={white}
                text={''}
                textAlign={'center'}
                fontFamily={'Monospace'}
                fontSize={100}
            />
        </>
    );
    yield txt_1().y(-100);
    yield txt_1().opacity(1);
    yield* txt_1().text('Andd what is', 0.5);
    yield* txt_2().text('The rule of succession', 0.5);
    yield* waitFor(0.5);
    yield* all(
        txt_1().opacity(0, 0.5),
        txt_2().y(-300, 1),
        txt_2().fontSize(120, 1),
    )
    yield* waitFor(0.5);
    const tex_1 = createRef<Latex>();
    yield view.add(
        <>
            <Latex
                ref={tex_1}
                tex="{\color{white} P(E) = \frac{s + 1}{n + 2}}"
                width={1000}
                y={100}
                opacity={0}
            />
        </>
    );
    yield* tex_1().opacity(1, 1);
    yield* waitFor(0.5);

    const lines_desc : Line[] = [];
    const txts_desc : Txt[] = [];
    yield view.add(
        <>
            <Txt text={''} fill={white} fontSize={60} y={400} x={-700} ref={makeRef(txts_desc, 0)}/>,
            <Line
                ref={makeRef(lines_desc, 0)}
                stroke={crimson}
                lineWidth={5}
                endArrow
                end={0}
                points={[
                    [-580, 380],
                    [-300, 200],
                ]}
            />,
            <Txt text={''} fill={white} fontSize={60} y={-160} x={530} ref={makeRef(txts_desc, 1)}/>,
            <Line
                ref={makeRef(lines_desc, 1)}
                stroke={crimson}
                lineWidth={5}
                endArrow
                end={0}
                points={[
                    [300, -150],
                    [200, -50],
                ]}
            />,
            <Txt text={''} fill={white} fontSize={60} y={380} x={530} ref={makeRef(txts_desc, 2)}/>,
            <Line
                ref={makeRef(lines_desc, 2)}
                stroke={crimson}
                lineWidth={5}
                endArrow
                end={0}
                points={[
                    [350, 370],
                    [200, 280],
                ]}
            />,
        </>,
    )
    yield* txts_desc[0].text('event E', 0.5);
    yield* waitFor(0.5);
    yield* lines_desc[0].end(1, 0.5);
    yield* waitFor(0.5);
    yield* txts_desc[1].text('success S times', 0.5);
    yield* waitFor(0.5);
    yield* lines_desc[1].end(1, 0.5);
    yield* waitFor(0.5);
    yield* txts_desc[2].text('total N times', 0.5);
    yield* waitFor(0.5);
    yield* lines_desc[2].end(1, 0.5);
    yield* waitFor(0.5);
    yield* all(
        ...txts_desc.map(txt => txt.opacity(0, 0.5)),
        ...lines_desc.map(line => line.end(0, 0.5)),
        tex_1().opacity(0, 0.5),
    )
    yield* waitFor(0.5);
    const code_1 = createRef<CodeBlock>();
    yield view.add(
        <>
            <CodeBlock
                y={0}
                ref={code_1}
                scale={2}
                code={'P(E) = (s + 1)/(n + 2)'}
                opacity={0}
            />
        </>
    )
    yield* code_1().opacity(1, 1);
    yield* waitFor(0.5);
    yield txt_1().text('');
    yield txt_1().opacity(1);
    yield txt_1().y(200);
    yield txt_1().fontSize(60);
    yield* txt_1().text('Assume that we know that the sun has risen up for\nlast 6000 year', 1);
    const txt_3 = createRef<Txt>();
    yield view.add(
        <>
            <Txt
                y={320}
                ref={txt_3}
                fill={white}
                text={''}
                textAlign={'center'}
                fontFamily={'Monospace'}
                fontSize={60}
            />
        </>
    );
    yield* waitFor(0.5);
    yield* txt_3().text('So S and N will be 6000 * 365', 0.5);
    yield* txt_3().text('So S and N will be 6000 * 365 = 2190000', 0.5);
    yield* waitFor(0.5);
    yield* code_1().edit(1.2, true)`P(E) = (${edit('s', '2190000')} + 1)/(${edit('n', '2190000')} + 2)`;
    yield* waitFor(0.5);
    yield* code_1().edit(1.2, true)`P(E) = ${edit('(2190000 + 1)/(2190000 + 2)', '0.9999995')}`;
    yield* waitFor(1);
    yield* all(
        txt_1().opacity(0, 0.5),
        txt_2().opacity(0, 0.5),
        txt_3().opacity(0, 0.5),
        code_1().opacity(0, 0.5),
    )
    yield* waitFor(0.5);
    yield txt_1().text('');
    yield txt_1().opacity(1);
    yield txt_1().y(0);
    yield txt_1().fontSize(100);
    yield* txt_1().text('So It\'s 99.99995%', 0.5);
    yield* waitFor(0.5);
    yield* txt_1().text('So It\'s 99.99995%\nbut we can go further', 0.5);
    yield* waitFor(0.5);
    yield* txt_1().text('So It\'s 99.99995%\nbut we can go further\nIn many other lenses', 0.5);
    yield* waitFor(1);
    yield* txt_1().opacity(0, 0.5);
    yield* waitFor(0.5);
    yield txt_1().text('Like in\nBayesian Probability');
    yield txt_1().x(-500);
    yield txt_1().y(-300);
    yield txt_1().fontSize(70);
    yield txt_2().text('Like in\nFrequentist Probability');
    yield txt_2().x(500);
    yield txt_2().y(-150);
    yield txt_2().fontSize(70);
    yield txt_3().text('Like in\nPhilosophical???');
    yield txt_3().x(-500);
    yield txt_3().y(150);
    yield txt_3().fontSize(70);
    
    const txt_4 = createRef<Txt>();

    yield view.add(
        <>
            <Txt
                x={500}
                y={300}
                ref={txt_4}
                fill={white}
                text={'And much more...'}
                textAlign={'center'}
                fontFamily={'Monospace'}
                fontSize={100}
                opacity={0}
            />
        </>
    )
    yield* txt_1().opacity(1, 0.5);
    yield* waitFor(0.5);
    yield* txt_2().opacity(1, 0.5);
    yield* waitFor(0.5);
    yield* txt_3().opacity(1, 0.5);
    yield* waitFor(0.5);
    yield* txt_4().opacity(1, 0.5);
    yield* waitFor(0.5);
    yield* txt_1().opacity(0, 0.5);
    yield* txt_2().opacity(0, 0.5);
    yield* txt_3().opacity(0, 0.5);
    yield* txt_4().opacity(0, 0.5);
    yield* waitFor(0.5);
});