import type { Profile } from "@/types/site";
import type { FooterSettings } from "@/types/site";

export default function Footer({
  profile,
  footer,
}: {
  profile: Profile;
  footer: FooterSettings;
}) {
  return (
    <footer className="desk:ml-[300px]">
      <div className="border-t border-gray-200 bg-light px-5 py-[15px]">
        <div className="mx-auto max-w-[1200px]">
          <p className="mb-0 text-center text-sm text-body">
            © <span>Copyright</span>{" "}
            <strong className="px-1 font-heading">{profile.name}</strong>{" "}
            <span>{footer.copyright_text}</span>
          </p>
          {footer.show_credit && (
            <p
              className="mb-0 text-center text-sm text-gray-400"
              dangerouslySetInnerHTML={{ __html: footer.credit_html }}
            />
          )}
        </div>
      </div>
    </footer>
  );
}