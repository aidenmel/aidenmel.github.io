--[[

    Techo Plugin
    A all new way to elevate your visual experience.
    
    
    [Warning] This file is not accessible for the public eye. Any attempts to steal, 
    reproduce, or copy code directly below will result in proper moderation 
    procauations and immediate removal of all licensed products.


    | Developed by
    | iVastz

    | Published by Techo Incorporated
    | Lasted updated 9/23/23

]]--

-- Variables
local PageTemplate = nil;
local PageAssets = nil; -- Location of page assets (input boxes, check boxes, etc.)

-- Functions
function unwrapPage(PageContent);

    -- Data
    PageTemplate.Name = PageContent['Title'];
    PageTemplate:SetAttribute('Desc', PageContent['Description']);

    -- Header
    PageTemplate['Header']['Title'].Text = tostring(PageContent['Title']);
    PageTemplate['Header']['Description'].Text = tostring(PageContent['Description']);
    PageTemplate['Header']['Subtext'].Text = tostring(PageContent['Subtext']);

        -- [Header] If an asset is set to nil, hide it
        for i,HeaderContent in pairs(PageTemplate['Header']:GetChildren()) do
            if HeaderContent:IsA('TextLabel') and HeaderContent.Text == 'nil' then
                HeaderContent.Visible = false;
            end
        end

    -- Questions
    if PageContent['Questions'] ~= {} then
        for i,QuestionData in pairs(PageContent['Questions']) do
            
            if table.find(PageAssets, QuestionData['Input']) ~= nil then
                
                local InputTemplate = QuestionData['Input']:Clone()

            end

        end
    end

end

-- Tables
local Pages = {
    ['Edit Video'] = {
        
        ['Title'] = 'Video Editor';
        ['Description'] = 'Edit video details, sizes, frames, and much more or delete it entirely.';
        ['Subtext'] = nil;

        ['ImageThumbnail'] = true;

        ['Questions'] = {
            [0] = {
                ['Title'] = 'Name';
                ['Description'] = 'Name of video; recommended 18 characters or less.';
                ['Placeholder'] = 'Video Name';

                ['Input'] = 'String';
                ['Value'] = 'Name';
                ['Required'] = true;
            };

            [1] = {

            }
        };
    }
}