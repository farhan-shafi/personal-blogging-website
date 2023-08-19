import SubHeader from "../sub-header";

import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { useSession } from "next-auth/react";
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const validateMessages = {
  required: "${label} is required!",
  string: {
    min: "${label} must be between ${min} to ${max} characters",
    max: "${label} must be between ${min} to ${max} characters",
  },
};

function LoginDashBoard() {
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState({ title: "", body: "" });

  const { data: session } = useSession();
  console.log(session);

  const onSubmit = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/auth/blog", {
        method: "POST",
        body: JSON.stringify(blog),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok && response.status === 409) {
        alert("User Already Exist");
      }
      if (response.ok) {
      }

      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };
  return (
    <>
      <SubHeader>
        <h2 className="pb-sub-header-title">Dashboard</h2>
      </SubHeader>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={() => console.log("hello")}
        style={{
          maxWidth: 600,
        }}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={["title"]}
          rules={[
            {
              required: true,
              min: 5,
              max: 50,
            },
          ]}
        >
          <Input
            value={blog.title}
            onChange={(newValue) => setBlog({ ...blog, title: newValue })}
          />
        </Form.Item>
        <Form.Item
          name={["body"]}
          rules={[
            {
              required: true,
              min: 100,
              max: 3000,
            },
          ]}
        >
          <Input.TextArea
            value={blog.body}
            onChange={(newValue) => setBlog({ ...blog, body: newValue })}
          />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            ...layout.wrapperCol,
            offset: 8,
          }}
        >
          <Button type="primary" loading={loading} htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default LoginDashBoard;
