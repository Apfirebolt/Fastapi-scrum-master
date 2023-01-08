import React, { useState } from "react";
import { Editor, stateToHTML, EditorState, convertFromRaw, convertToRaw } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


const Home = () => {
  
  const [editorState, setEditorState] = useState({})

  const updateTextDescription = async (state) => {
    await setEditorState(state);
    
    console.log('Data ', editorState.getCurrentContent())
  };
  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-16 lg:flex lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Kanban Board.
            <strong className="font-extrabold text-red-700 sm:block">
              React and FAST API.
            </strong>
          </h1>

          <p className="mt-4 sm:text-xl sm:leading-relaxed">
            A simple Jira clone - create tasks and arrange them through drag and drop
          </p>

          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={updateTextDescription}
          />;
        </div>
      </div>
    </div>
  );
};

export default Home;
