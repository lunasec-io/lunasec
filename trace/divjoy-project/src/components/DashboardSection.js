import React from "react";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Section from "./Section";
import SectionHeader from "./SectionHeader";
import DashboardItems from "./DashboardItems";
import { Link, useRouter } from "./../util/router";
import { useAuth } from "./../util/auth";

function DashboardSection(props) {
  const auth = useAuth();
  const router = useRouter();

  return (
    <Section
      bg={props.bg}
      textColor={props.textColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Container>
        <SectionHeader
          title={props.title}
          subtitle={props.subtitle}
          size={1}
          spaced={true}
          className="text-center"
        />

        {router.query.paid && auth.user.planIsActive && (
          <Alert
            variant="success"
            className="text-center mx-auto mb-5"
            style={{ maxWidth: "400px" }}
          >
            You are now subscribed to the {auth.user.planId} plan
            <span className="ml-2" role="img" aria-label="party">
              🥳
            </span>
          </Alert>
        )}

        <Row>
          <Col lg={6}>
            <DashboardItems />
          </Col>
          <Col lg={6} className="mt-4 mt-lg-0">
            <Card>
              <Card.Body>
                <h5 className="mb-3">What is this?</h5>
                <p>
                  The component on your left is an example UI that shows you how
                  to fetch, display, and update a list of items that belong to
                  the current authenticated user. Try it now by adding a couple
                  items.
                </p>
                <p>
                  It also shows how you can limit features based on plan. If
                  you're subscribed to the "pro" or "business" plan then you'll
                  be able to use the star button to highlight items, otherwise
                  you'll be asked to upgrade your plan.
                </p>
                <p>
                  After exporting your code, you'll want to modify this
                  component to your needs. You may also find it easier to just
                  use this component as a reference as you build out your custom
                  UI.
                </p>
                <div className="mt-4">
                  <h5 className="mb-3">Extra debug info</h5>
                  <div>
                    You are signed in as <strong>{auth.user.email}</strong>.
                  </div>

                  {auth.user.stripeSubscriptionId && (
                    <>
                      <div>
                        You are subscribed to the{" "}
                        <strong>{auth.user.planId} plan</strong>.
                      </div>
                      <div>
                        Your plan status is{" "}
                        <strong>{auth.user.stripeSubscriptionStatus}</strong>.
                      </div>
                    </>
                  )}

                  <div>
                    You can change your account info{` `}
                    {auth.user.stripeSubscriptionId && <>and plan{` `}</>}
                    in{` `}
                    <Link to="/settings/general">
                      <strong>settings</strong>
                    </Link>
                    .
                  </div>

                  {!auth.user.stripeSubscriptionId && (
                    <div>
                      You can signup for a plan in{" "}
                      <Link to="/pricing">
                        <strong>pricing</strong>
                      </Link>
                      .
                    </div>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Section>
  );
}

export default DashboardSection;
