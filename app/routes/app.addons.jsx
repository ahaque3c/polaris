import {
    Card,
    Layout,
    Button,
    Page,
    InlineGrid,
} from "@shopify/polaris";
import { json } from "@remix-run/node";
import { TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { useFetcher } from "@remix-run/react";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
    await authenticate.admin(request);
    return null;
};

export const action = async ({ request }) => {
    const { admin } = await authenticate.admin(request);
    const formData = await request.formData();

    const key = formData.get("key");
    const value = formData.get("value");

    // Step 1: Fetch the current app installation ID

    const appInstallationResponse = await admin.graphql(
        `#graphql
      query {
        appInstallation {
          id
        }
      }
    `
    );
    const appInstallationResponseJson = await appInstallationResponse.json();

    const appInstallationId = appInstallationResponseJson.data.appInstallation.id;


    const metafieldResponse = await admin.graphql(
        `#graphql
    mutation MetafieldsSet($metafields: [MetafieldsSetInput!]!) {
      metafieldsSet(metafields: $metafields) {
        metafields {
          id
        namespace
        key
        }
        userErrors {
          field
          message
        }
      }
    }`,
        {
            variables: {
                "metafields": [
                    {
                        "namespace": "applicationInstallation",
                        key,
                        "type": "boolean",
                        "value": "true",
                        "ownerId": appInstallationId
                    }
                ]
            },
        },
    );

    const metafieldResponseJson = await metafieldResponse.json();

    console.log(metafieldResponseJson.data.metafieldsSet.metafields);

    return json({
        meta: metafieldResponseJson.data.metafieldsSet.metafields
    });
};


export default function Addons() {
    const fetcher = useFetcher();
    const shopify = useAppBridge();
    const isLoading =
        ["loading", "submitting"].includes(fetcher.state) &&
        fetcher.formMethod === "POST";

    const createMetafield = (key, value) => {
        fetcher.submit({ key, value }, { method: "POST" });
    };

    return (
        <Page>
            <TitleBar title="Addons" />
            <Layout>
                <Layout.Section>
                    <InlineGrid columns='3' gap='200'>
                        <Card>
                            <img width='250' src="https://img.youtube.com/vi/fbCtMT7zXl4/maxresdefault.jpg" />
                            <Button loading={isLoading} onClick={() => createMetafield("free_collection", "true")}>
                                Free Collection Activate
                            </Button>
                        </Card>
                        <Card>
                            <img width='250' src="https://img.youtube.com/vi/vwDMOQOt7o4/maxresdefault.jpg" />
                            <Button loading={isLoading} onClick={() => createMetafield("premium_testimonial", "true")}>
                                Premium Testimonial Activate
                            </Button>
                        </Card>
                        <Card>
                            <img width='250' src="https://img.youtube.com/vi/fbCtMT7zXl4/maxresdefault.jpg" />
                            <Button loading={isLoading} onClick={() => createMetafield("premium_faq", "true")}>
                                Premium Faq Activate
                            </Button>
                        </Card>
                    </InlineGrid>
                </Layout.Section>
            </Layout>
        </Page>
    );
}
