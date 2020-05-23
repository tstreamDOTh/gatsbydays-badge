import React, { useState, useRef } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import DisplayPicEditor from "react-dp"

const IndexPage = () => {
  const [dpUrl, setDpUrl] = useState()
  const dpEditor = useRef()
  return (
    <Layout>
      <SEO title="Home" />

      <label for="avatar">Choose a profile picture:</label>
      <br />
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
      <br />
      <br />
      {dpUrl && (
        <DisplayPicEditor
          ref={dpEditor}
          src={dpUrl}
          overlay="https://media.kubric.io/api/assetlib/ddab4f1e-12b4-4807-9c54-b94f1f7fd28d.png"
          size={300}
          backgroundColor="#888"
          enableDownload={false}
          onExportCallback={({
            imagePositionX,
            imagePositionY,
            imageWidth,
            imageHeight,
            size,
          }) => {
            const canvas = document.createElement("canvas")
            var context = canvas.getContext("2d")
            context.canvas.width = 1000
            context.canvas.height = 1000

            var baseImage = new Image()

            baseImage.onload = () => {
              context.drawImage(
                baseImage,
                (imagePositionX / size) * 1000,
                (imagePositionY / size) * 1000,
                (imageWidth / size) * 1000,
                (imageHeight / size) * 1000
              )
              var overlayImage = new Image()

              overlayImage.onload = () => {
                context.drawImage(overlayImage, 0, 0, 1000, 1000)
                const url = canvas.toDataURL("image/png")
                var download = document.createElement("a")
                download.href = url.replace("image/png", "image/octet-stream")
                download.download = "gatsbydays.png"
                download.click()
              }
              overlayImage.setAttribute("crossorigin", "anonymous")
              overlayImage.setAttribute(
                "src",
                "https://media.kubric.io/api/assetlib/ddab4f1e-12b4-4807-9c54-b94f1f7fd28d.png"
              )
            }

            baseImage.setAttribute("crossorigin", "anonymous")
            baseImage.setAttribute("src", dpUrl)
          }}
        />
      )}
      <br />
      {dpUrl && (
        <button
          onClick={() => {
            dpEditor.current.saveAsImage(url => {})
          }}
        >
          Save
        </button>
      )}
    </Layout>
  )
}

export default IndexPage
