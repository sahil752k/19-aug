with open('/app/applet/src/types.ts', 'r') as f:
    content = f.read()

new_fields = """  wcrCategory?: string;
  wcrSanctionNumber?: string;
  wcrModuleWarranty?: string;
  wcrInverterMakeModel?: string;
  wcrPcuRating?: string;
  wcrPcuChargeController?: string;
  wcrPcuHpd?: string;
  wcrPcuYearOfManufacturing?: string;
  wcrEarthingNo?: string;
  wcrEarthingCertificate?: string;
  wcrLighteningArrester?: string;"""

if "wcrCategory" not in content:
    content = content.replace("  // Invoice / Bill specific", new_fields + "\n  // Invoice / Bill specific")

    default_fields = """  wcrCategory: '',
  wcrSanctionNumber: '',
  wcrModuleWarranty: '',
  wcrInverterMakeModel: '',
  wcrPcuRating: '',
  wcrPcuChargeController: '',
  wcrPcuHpd: '',
  wcrPcuYearOfManufacturing: '',
  wcrEarthingNo: '',
  wcrEarthingCertificate: '',
  wcrLighteningArrester: '',"""

    content = content.replace("    invoiceNo: '',", default_fields + "\n  invoiceNo: '',")

    with open('/app/applet/src/types.ts', 'w') as f:
        f.write(content)

