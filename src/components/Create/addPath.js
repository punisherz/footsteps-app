import React, { Component } from "react"
import { Row, Col } from "antd"
import uuid from "uuid"

import styles from "../../styles/add.module.css"

import AddFootsteps from "./addFootstep"

export class addPath extends Component {
  state = {
    title: "",
    description: "",
    icon:
      "https://www.gatsbyjs.org/static/gatsby-icon-4a9773549091c227cd2eb82ccd9c5e3a.png",
    footsteps: [],
    id: "",
    err_msg: "",
  }

  componentDidMount() {
    this.setState({
      id: uuid.v4(),
    })
  }

  handleInputChange = e => {
    const target = e.target
    this.setState({
      [target.name]: target.value,
    })
  }

  addNewFootstep = () => {
    this.setState(state => {
      let new_footstep = { id: uuid.v4() }

      return { footsteps: [...state.footsteps, new_footstep] }
    })
  }

  updateFootstepContent = newFootstep => {
    let { footsteps } = this.state

    let footstepToReplaceIndex = footsteps.findIndex(
      footstep => footstep.id === newFootstep.id
    )

    footsteps[footstepToReplaceIndex] = newFootstep

    this.setState({
      footsteps,
    })
  }

  removeNewFootstep = id => {
    let removed_footstep = this.state.footsteps.filter(
      footstep => footstep.id !== id
    )

    this.setState({
      footsteps: removed_footstep,
    })
  }

  render() {
    return (
      <div className={styles.container}>
        <h1 className={styles.heading}>Create a new Path</h1>
        <Row>
          <Col xs={24} lg={12}>
            <div className={styles.input_label}>Title</div>
            <input
              className={styles.input}
              name="title"
              value={this.state.title}
              onChange={this.handleInputChange}
              placeholder="Intro to Gatsby"
            />

            <div className={styles.input_label}>Description</div>
            <textarea
              className={styles.input}
              name="description"
              value={this.state.description}
              onChange={this.handleInputChange}
              placeholder="Gatsby is a free and open source framework based on React"
              style={{ height: "100px" }}
            />
          </Col>
          <Col xs={24} lg={12}>
            <div className={styles.icon_container}>
              <img src={this.state.icon} alt="" />
            </div>

            <div className={styles.icon_input_container}>
              <div className={styles.input_label}>Icon URL</div>
              <input
                className={styles.input}
                name="icon"
                value={this.state.icon}
                onChange={this.handleInputChange}
                placeholder="Icon URL"
              />
            </div>
          </Col>
        </Row>

        <div className={styles.footsteps_container}>
          <h1 className={styles.footsteps_heading}>Footsteps</h1>

          {this.state.footsteps.map((footstep, i) => {
            return (
              <div key={footstep.id}>
                <AddFootsteps
                  index={i + 1}
                  pathId={this.state.id}
                  data={footstep}
                  remove={this.removeNewFootstep}
                  update={this.updateFootstepContent}
                />
              </div>
            )
          })}

          {this.state.footsteps.length < 10 ? (
            <div className={styles.footsteps_new_container}>
              <div
                className={styles.footsteps_new}
                onClick={this.addNewFootstep}
              >
                Add new Footstep
              </div>
            </div>
          ) : (
            ""
          )}
        </div>

        <div className={styles.error_message}>{this.state.err_msg}</div>

        <div className={styles.path_submit_container}>
          <div className={styles.path_submit}>Create Path</div>
        </div>
      </div>
    )
  }
}

export default addPath
