import React, { useState, useRef } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import DisplayPicEditor from "react-dp"

const IndexPage = () => {
  const [dpUrl, setDpUrl] = useState()
  const dpEditor = useRef()
  return (
    <Layout>
      <SEO title="Home" />

      <label for="avatar">Choose a profile picture:</label>

      <input
        type="file"
        id="avatar"
        name="avatar"
        accept="image/png, image/jpeg"
        onChange={event => {
          var file = event.target.files[0]
          var reader = new FileReader()
          var baseString
          reader.onloadend = function () {
            baseString = reader.result
            setDpUrl(baseString)
          }
          reader.readAsDataURL(file)
        }}
      ></input>
      {dpUrl && (
        <DisplayPicEditor
          ref={dpEditor}
          src={dpUrl}
          overlay="https://media.kubric.io/api/assetlib/2cb2b879-5fc6-471a-a43d-e6b3e385bf47.png"
          size={500}
          backgroundColor="#888"
        />
      )}
      {dpUrl && (
        <button
          onClick={() => {
            dpEditor.current.saveAsImage(url => {
              //   window.location.href = url.replace(
              //     "image/png",
              //     "image/octet-stream"
              //   )
            })
          }}
        >
          Save
        </button>
      )}
    </Layout>
  )
}

export default IndexPage
