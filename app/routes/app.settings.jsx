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
  
  export default function Settings() {
    return (
      <Page>
      <TitleBar title="Settings" />
      <Layout>
        <Layout.Section>
          <Card>
          Settings
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
    );
  }
  