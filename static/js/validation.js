$(document).ready(function() {
    const validationRules = {
        Compliance_Details: {
            regex: /^[a-zA-Z0-9\s]{5,100}$/,
            message: "Compliance Details should be 5-100 alphanumeric characters.",
            emptyMessage: "Please fill the Compliance Details."
        },
        Name_of_Statutory: {
            regex: /^[a-zA-Z\s]{2,50}$/,
            message: "Name of Statutory should be 2-50 alphabetic characters.",
            emptyMessage: "Please fill the Name of Statutory."
        },
        Frequency: {
            regex: /^(Daily|Weekly|Monthly|Quarterly|Yearly)$/i,
            message: "Frequency should be Daily, Weekly, Monthly, Quarterly, or Yearly.",
            emptyMessage: "Please fill the Frequency."
        },
        Valid_From: {
            regex: /^\d{4}-\d{2}-\d{2}$/,
            message: "Please enter a valid date in YYYY-MM-DD format.",
            emptyMessage: "Please fill the Valid From date."
        },
        Valid_Upto: {
            regex: /^\d{4}-\d{2}-\d{2}$/,
            message: "Please enter a valid date in YYYY-MM-DD format.",
            emptyMessage: "Please fill the Valid Upto date."
        },
        Remarks: {
            regex: /^[\s\S]{10,500}$/,
            message: "Remarks should be 10-500 characters.",
            emptyMessage: "Please fill the Remarks."
        }
    };

    function validateField(field, prefix = '') {
        const value = field.val().trim();
        const name = field.attr('name');
        const rule = validationRules[name];
        const errorElement = $(`#${prefix}${name}_error`);

        if (value === '') {
            errorElement.text(rule.emptyMessage);
            return false;
        } else if (rule && !rule.regex.test(value)) {
            errorElement.text(rule.message);
            return false;
        } else {
            errorElement.text('');
            return true;
        }
    }

    function validateAllFields(formId, prefix = '') {
        let isValid = true;
        $(`#${formId} input, #${formId} textarea`).each(function() {
            if (!validateField($(this), prefix)) {
                isValid = false;
            }
        });
        return isValid;
    }

    function attachValidation(formId, prefix = '') {
        $(`#${formId} input, #${formId} textarea`).on('input', function() {
            validateField($(this), prefix);
        });

        $(`#${formId}`).on('submit', function(e) {
            e.preventDefault();
            if (validateAllFields(formId, prefix)) {
                this.submit();
            }
        });
    }

    // Attach validation to both forms
    attachValidation('complianceForm');
    attachValidation('editComplianceForm', 'edit');
});
