import base from "../common/base.mjs";

export default {
  ...base,
  key: "patreon-member-created",
  name: "Member Created",
  description: "Emit new event for each created member",
  version: "0.0.1",
  type: "source",
  dedupe: "unique",
  hooks: {
    ...base.hooks,
    async deploy() {
      console.log("Fetching historical events...");
      const response = await this.patreon.listMembers({
        campaign: this.campaign,
        params: {
          "page[count]": 25,
          // "sort": "-created",
          // "fields[tier]": "full_name",
        },
      });
      for (const member of response.data) {
        this.emitMemberEvent(member);
      }
    },
  },
  methods: {
    ...base.methods,
    getTriggerType() {
      return "members:create";
    },
    emitMemberEvent(member) {
      this.emitEvent({
        event: member,
        id: member.id,
        summary: `New member: ${member.attributes.full_name}`,
        ts: new Date(),
      });
    },
  },
  async run(event) {
    console.log("Emitting event...");
    const member = event.body.data;
    this.emitMemberEvent(member);
  },
};
