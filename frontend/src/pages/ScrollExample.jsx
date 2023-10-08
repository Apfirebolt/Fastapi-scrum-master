import React from 'react';
import { Element, scroller } from 'react-scroll';

function SmoothScroll() {
    const scrollToElement = (elementName) => {
        scroller.scrollTo(elementName, {
            duration: 800,
            delay: 0,
            smooth: 'easeInOutQuart'
        });
    };

    return (
        <div>
            <button onClick={() => scrollToElement('myElement')}>Scroll to Element</button>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod commodi amet facere iste eveniet id tenetur 
                placeat, consectetur ex quas quia, illum natus asperiores! Assumenda magnam, accusamus voluptas consequuntur nisi quas 
                ducimus sapiente fuga eveniet id nam sed vel architecto ipsa officia eos porro, eius aperiam ratione ea dolorem? 
                Consequatur ipsum quod cumque? Nam exercitationem, necessitatibus corrupti porro possimus molestias dignissimos 
                quis nisi perspiciatis deserunt voluptates architecto deleniti accusamus in quia laboriosam inventore rerum est. 
                Corrupti amet quia iste rerum voluptates dignissimos tempore facilis repellendus fuga dolor error similique voluptas 
                soluta officiis a inventore, non unde commodi expedita quibusdam quos!
            </p>

            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod commodi amet facere iste eveniet id tenetur 
                placeat, consectetur ex quas quia, illum natus asperiores! Assumenda magnam, accusamus voluptas consequuntur nisi quas 
                ducimus sapiente fuga eveniet id nam sed vel architecto ipsa officia eos porro, eius aperiam ratione ea dolorem? 
                Consequatur ipsum quod cumque? Nam exercitationem, necessitatibus corrupti porro possimus molestias dignissimos 
                quis nisi perspiciatis deserunt voluptates architecto deleniti accusamus in quia laboriosam inventore rerum est. 
                Corrupti amet quia iste rerum voluptates dignissimos tempore facilis repellendus fuga dolor error similique voluptas 
                soluta officiis a inventore, non unde commodi expedita quibusdam quos!
            </p>

            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod commodi amet facere iste eveniet id tenetur 
                placeat, consectetur ex quas quia, illum natus asperiores! Assumenda magnam, accusamus voluptas consequuntur nisi quas 
                ducimus sapiente fuga eveniet id nam sed vel architecto ipsa officia eos porro, eius aperiam ratione ea dolorem? 
                Consequatur ipsum quod cumque? Nam exercitationem, necessitatibus corrupti porro possimus molestias dignissimos 
                quis nisi perspiciatis deserunt voluptates architecto deleniti accusamus in quia laboriosam inventore rerum est. 
                Corrupti amet quia iste rerum voluptates dignissimos tempore facilis repellendus fuga dolor error similique voluptas 
                soluta officiis a inventore, non unde commodi expedita quibusdam quos!
            </p>

            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod commodi amet facere iste eveniet id tenetur 
                placeat, consectetur ex quas quia, illum natus asperiores! Assumenda magnam, accusamus voluptas consequuntur nisi quas 
                ducimus sapiente fuga eveniet id nam sed vel architecto ipsa officia eos porro, eius aperiam ratione ea dolorem? 
                Consequatur ipsum quod cumque? Nam exercitationem, necessitatibus corrupti porro possimus molestias dignissimos 
                quis nisi perspiciatis deserunt voluptates architecto deleniti accusamus in quia laboriosam inventore rerum est. 
                Corrupti amet quia iste rerum voluptates dignissimos tempore facilis repellendus fuga dolor error similique voluptas 
                soluta officiis a inventore, non unde commodi expedita quibusdam quos!
            </p>

            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod commodi amet facere iste eveniet id tenetur 
                placeat, consectetur ex quas quia, illum natus asperiores! Assumenda magnam, accusamus voluptas consequuntur nisi quas 
                ducimus sapiente fuga eveniet id nam sed vel architecto ipsa officia eos porro, eius aperiam ratione ea dolorem? 
                Consequatur ipsum quod cumque? Nam exercitationem, necessitatibus corrupti porro possimus molestias dignissimos 
                quis nisi perspiciatis deserunt voluptates architecto deleniti accusamus in quia laboriosam inventore rerum est. 
                Corrupti amet quia iste rerum voluptates dignissimos tempore facilis repellendus fuga dolor error similique voluptas 
                soluta officiis a inventore, non unde commodi expedita quibusdam quos!
            </p>

            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod commodi amet facere iste eveniet id tenetur 
                placeat, consectetur ex quas quia, illum natus asperiores! Assumenda magnam, accusamus voluptas consequuntur nisi quas 
                ducimus sapiente fuga eveniet id nam sed vel architecto ipsa officia eos porro, eius aperiam ratione ea dolorem? 
                Consequatur ipsum quod cumque? Nam exercitationem, necessitatibus corrupti porro possimus molestias dignissimos 
                quis nisi perspiciatis deserunt voluptates architecto deleniti accusamus in quia laboriosam inventore rerum est. 
                Corrupti amet quia iste rerum voluptates dignissimos tempore facilis repellendus fuga dolor error similique voluptas 
                soluta officiis a inventore, non unde commodi expedita quibusdam quos!
            </p>

            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod commodi amet facere iste eveniet id tenetur 
                placeat, consectetur ex quas quia, illum natus asperiores! Assumenda magnam, accusamus voluptas consequuntur nisi quas 
                ducimus sapiente fuga eveniet id nam sed vel architecto ipsa officia eos porro, eius aperiam ratione ea dolorem? 
                Consequatur ipsum quod cumque? Nam exercitationem, necessitatibus corrupti porro possimus molestias dignissimos 
                quis nisi perspiciatis deserunt voluptates architecto deleniti accusamus in quia laboriosam inventore rerum est. 
                Corrupti amet quia iste rerum voluptates dignissimos tempore facilis repellendus fuga dolor error similique voluptas 
                soluta officiis a inventore, non unde commodi expedita quibusdam quos!
            </p>

            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod commodi amet facere iste eveniet id tenetur 
                placeat, consectetur ex quas quia, illum natus asperiores! Assumenda magnam, accusamus voluptas consequuntur nisi quas 
                ducimus sapiente fuga eveniet id nam sed vel architecto ipsa officia eos porro, eius aperiam ratione ea dolorem? 
                Consequatur ipsum quod cumque? Nam exercitationem, necessitatibus corrupti porro possimus molestias dignissimos 
                quis nisi perspiciatis deserunt voluptates architecto deleniti accusamus in quia laboriosam inventore rerum est. 
                Corrupti amet quia iste rerum voluptates dignissimos tempore facilis repellendus fuga dolor error similique voluptas 
                soluta officiis a inventore, non unde commodi expedita quibusdam quos!
            </p>
            <Element name="myElement">
                <h1>My Element</h1>
                <p>This is the element I want to scroll to.</p>
            </Element>
        </div>
    );
}

export default SmoothScroll;
