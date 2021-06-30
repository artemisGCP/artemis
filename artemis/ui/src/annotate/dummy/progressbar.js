import ProgressBar from 'react-bootstrap/ProgressBar'

function Progress(props) {

    const handleBehaviors = (d) => {
        props.setFocusedBehavior({ behavior: d.behavior, key: d.key })
    }

    const handleAnnotation = (behavior, annotations) => {
        for (const annotation of annotations) {
            if (behavior.text === annotation.text) {
                let d = [0]
                let e = []
                let c = annotation.data.sort(function (a, b) {
                    return a[0][0] - b[0][0];
                });
           
                for (const a of c) {
                    d.push(a[0][0])
                    d.push(a[1][0])
                    e.push(a[0][0])
                }
                d.push(1);

                let f = false;
                let g = [];
                let totalSeg = 0;
                for (let i = 0; i < d.length - 1; i++) {
                    let color = 'danger';
                    if (!f) {
                        color = 'info';
                    }
                    if (i == d.length - 2) {
                        g.push({ behavior: behavior.text, key: i, seg: 100 - totalSeg, show: color });

                    }
                    else {
                        g.push({ behavior: behavior.text, key: i, seg: Math.round((d[i + 1] - d[i]) * 100), show: color });
                        totalSeg += Math.round((d[i + 1] - d[i]) * 100);
                    }
                    f = !f;
                }
                return g;
            }
        }
    }

    return (

        <ProgressBar>
          {handleAnnotation(props.behavior, props.annotations).map((d) => (
          <ProgressBar tabIndex="0" onFocus={() => handleBehaviors(d)} variant={d.show} now={d.seg} key={d.key} />))}
        </ProgressBar>
    )
}

export default Progress;