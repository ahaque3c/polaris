import {
    Box,
    Card,
    Layout,
    Link,
    List,
    Page,
    Text,
    BlockStack,
  } from "@shopify/polaris";
  import { TitleBar } from "@shopify/app-bridge-react";
  
  export default function Pricing() {
    return (
      <Page>
        <TitleBar title="Pricing" />
        <Layout>
          <Layout.Section>
            <Card>
            Pricing
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    );
  }
